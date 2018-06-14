// @flow

import { createStructuredSelector, createSelector } from 'reselect';
import { get } from '../../utils/net'

const ANSWER_QUESTION = 'buttonkit/questions/ANSWER_QUESTION';
const FETCHING_DATASTOREITEMS = 'buttonkit/questions/FETCHING_DATASTOREITEMS';
const FETCHED_DATASTOREITEMS = 'buttonkit/questions/FETCHED_DATASTOREITEMS';
const SUBMITTING = 'buttonkit/questions/SUBMITTING';

const NAME = "questions";

const initialState: State = {
    answers: {},
    datastoreitems: {},
};

export default function reducer(state: State = initialState, action: any = {}): State {
    switch (action.type) {

        case ANSWER_QUESTION:
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.buttonId]: {
                        ...state.answers[action.buttonId],
                        [action.questionId]: action.answer,
                    }
                }
            }
        case FETCHED_DATASTOREITEMS:
            return {
                ...state,
                datastoreitems: {
                    ...state.datastoreitems,
                    [action.questionId]: action.data,
                }

            }
        default:
            return state;
    }
}

const _check_complete = (questions, answers = {}) => {
    return questions.reduce((acc, question) => {
        return acc && question.questionId in answers;
    }, true);
}

const current = (state, newProps) => {
    const buttonId = newProps.navigation.getParam("buttonId");

    if (buttonId) {
        const questions = state.buttons.buttonsById[buttonId].questions;
        if (questions) {
            const questionIndex = newProps.navigation.getParam("questionIndex") || 0;
            if (questionIndex < questions.length) {

                const question = questions[questionIndex];
                const items = question.questionId in state[NAME].datastoreitems ? { datastoreitems: state[NAME].datastoreitems[question.questionId] } : {};

                return {
                    question,
                    next: questionIndex == questions.length - 1 ? questionIndex : questionIndex + 1,
                    answer: state[NAME].answers[buttonId] ? state[NAME].answers[buttonId][question.questionId] : undefined,
                    complete: _check_complete(questions, state[NAME].answers[buttonId]),
                    ...items,
                }
            }
        }

    }
    return {};
}

const _format_answer = (question, answer, datastoreitems) => {
    switch (question.type) {
        case "datastoreitem": {

            return datastoreitems.map(item => {
                return {
                    datastore: question.values.storeId,
                    value: item,
                }
            })
        }
        case "signature": {
            return answer.encoded;
        }
    }
}

const _createPayload = (buttonId, questions, answers, datastoreitems = {}) => {
    return {
        buttonId,
        answers: questions.reduce((acc, question) => {
            acc[question.questionId] = _format_answer(question, answers[question.questionId], datastoreitems[question.questionId])
            return acc;
        }, {})
    }
}

function submit(buttonId) {
    return (dispatch, getState) => {

        dispatch({ type: SUBMITTING });
        const state = getState();
        const questions = state.buttons.buttonsById[buttonId].questions;
        const answers = state[NAME].answers[buttonId];
        const payload = _createPayload(buttonId, questions, answers, state[NAME].datastoreitems);
        console.log("hav epayload:");
        console.log(payload);
    }
}

function fetchDatastoreItems(question) {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_DATASTOREITEMS });
        get('http://127.0.0.1:8080/stores/store', { questionId: question.questionId, store: question.values.storeId }).then((body) => {
            dispatch({ type: FETCHED_DATASTOREITEMS, questionId: question.questionId, data: body })
        });
    }
}

function answerQuestion(buttonId, questionId, answer) {
    console.log("ANSWERING QUESTIN!!", buttonId, questionId, answer);
    return {
        type: ANSWER_QUESTION,
        buttonId,
        questionId,
        answer,
    }
}

export const actionCreators = {
    answerQuestion,
    fetchDatastoreItems,
    submit,
};

export const selector = createStructuredSelector({
    current,
});
