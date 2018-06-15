// @flow

import { createStructuredSelector, createSelector } from 'reselect';
import { get, post } from '../../utils/net'

const ANSWER_QUESTION = 'buttonkit/questions/ANSWER_QUESTION';
const FETCHING_DATASTOREITEMS = 'buttonkit/questions/FETCHING_DATASTOREITEMS';
const FETCHED_DATASTOREITEMS = 'buttonkit/questions/FETCHED_DATASTOREITEMS';
const SUBMITTING = 'buttonkit/questions/SUBMITTING';
const FETCHED_USERS = 'buttonkit/questions/FETCHED_USERS';
const FETCHING_USERS = 'buttonkit/questions/FETCHING_USERS';
const CALLING_SERVER_FUNCTION = 'buttonkit/questions/CALLING_SERVER_FUNCTION';
const NAME = "questions";


const _flatten = (arr) => {
    return arr.reduce((acc, row) => {
        return row.reduce((acc, src) => {
            acc.push(src);
            return acc;
        }, acc);
    }, [])
}


const _apartments = function (blocks) {
    return _flatten(Object.keys(blocks).map(function (blockkey) {
        const block = blocks[blockkey];
        return _flatten(Object.keys(block.floors).map(function (floorKey) {
            const floor = block.floors[floorKey];
            return Object.keys(floor.apartments).map(function (apartmentkey) {
                const apartment = floor.apartments[apartmentkey];
                return {
                    name: apartment.name,
                    apartmentId: apartment.apartmentId,
                    floor: { name: floor.name, floorId: floor.floorId },
                    block: { name: block.name, blockId: block.blockId },
                    users: apartment.users,
                };
            });
        }));
    }));
};

const initialState: State = {
    answers: {},
    apartments: [],
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
        case FETCHED_USERS:
            const _state = {
                ...state,
                apartments: _apartments(action.blocks),
            }
            return _state;


        default:
            return state;
    }
}

const _check_complete = (questions, answers = {}) => {
    return questions.reduce((acc, question) => {
        return acc && question.questionId in answers;
    }, true);
}


const apartments = (state) => state[NAME].apartments;


const current = (state, newProps) => {
    const buttonId = newProps.navigation.getParam("buttonId");

    if (buttonId) {
        const button = state.buttons.buttonsById[buttonId];
        const questions = button.questions;

        if (questions) {
            const questionIndex = newProps.navigation.getParam("questionIndex") || 0;
            if (questionIndex < questions.length) {

                const question = questions[questionIndex];
                const items = question.questionId in state[NAME].datastoreitems ? { datastoreitems: state[NAME].datastoreitems[question.questionId] } : {};

                return {
                    question,
                    next: questionIndex == questions.length - 1 ? questionIndex : questionIndex + 1,
                    answer: state[NAME].answers[buttonId] ? state[NAME].answers[buttonId][question.questionId] : undefined,
                    complete: button.type === "action" && _check_complete(questions, state[NAME].answers[buttonId]),
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
        console.log("posting payload", payload);
        post("http://127.0.0.1:8080/panel/action", payload).then((result) => {
            console.log(result);
        });

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

function fetchUsers() {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_USERS });
        get('http://127.0.0.1:8080/panel/users').then((body) => {
            dispatch({ type: FETCHED_USERS, blocks: body })
        });
    }
}

function callServerFunction(buttonId, questionId, options) {
    return (dispatch, getState) => {
        dispatch({ type: CALLING_SERVER_FUNCTION });

        const button = getState().buttons.buttonsById[buttonId];
        const questions = button.questions;
        const answers = getState()[NAME].answers[buttonId]

        const data = questions.reduce((acc, item) => {
            if (item.questionId !== questionId) {
                acc = [...acc, { ...item, values: { ...answers[item.questionId] } }]
            }
            return acc;
        }, []);

        if (options.method === "POST") {
            post(`http://127.0.0.1:8080${options.url}`, { data } || {}).then((result) => {
                if (result && result.value) {
                    dispatch(answerQuestion(buttonId, questionId, result.value))
                }
            });
        } else if (options.method === "GET") {
            get(`http://127.0.0.1:8080${options.url}`, { data } || {}).then((result) => {
                if (result && result.value) {
                    dispatch(answerQuestion(buttonId, questionId, result.value))
                }
            });
        }
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
    fetchUsers,
    submit,
    callServerFunction,
};

export const selector = createStructuredSelector({
    current,
    apartments,
});
