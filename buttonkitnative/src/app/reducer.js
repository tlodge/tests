import { combineReducers } from 'redux';
import buttons, { NAME as buttonsName } from '../features/buttons';
import questions, { NAME as questionsName } from '../features/questions';
export default combineReducers({
    buttons,
    questions
});