// @flow

import { createStructuredSelector, createSelector } from 'reselect';

const ANSWER_QUESTION = 'buttonkit/questions/ANSWER_QUESTION';

const NAME = "questions";

const initialState: State = {
    answers: {}
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

                return {
                    question,
                    next: questionIndex == questions.length - 1 ? questionIndex : questionIndex + 1,
                    answer: state[NAME].answers[buttonId] ? state[NAME].answers[buttonId][question.questionId] : undefined,
                }
            }
        }

    }
    return {};
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
    answerQuestion
};

export const selector = createStructuredSelector({
    current,
});
