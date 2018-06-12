// @flow

import { createStructuredSelector, createSelector } from 'reselect';
import { get } from '../../utils/net'

const ANSWER_QUESTION = 'buttonkit/questions/ANSWER_QUESTION';
const FETCHING_DATASTOREITEMS = 'buttonkit/questions/FETCHING_DATASTOREITEMS';
const FETCHED_DATASTOREITEMS = 'buttonkit/questions/FETCHED_DATASTOREITEMS';

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
                    ...items,
                }
            }
        }

    }
    return {};
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
};

export const selector = createStructuredSelector({
    current,
});
