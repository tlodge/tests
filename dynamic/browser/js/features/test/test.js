import { createStructuredSelector } from 'reselect';

// Action Types
const MAKE_TEST = 'test/MAKE_TEST';


export const NAME = 'test';


const initialState = {};

// Reducer
export default function reducer(state = initialState, action ={}) {
  
  switch (action.type) {
    
    case MAKE_TEST:
      console.log("in reducer test!")
      return state;

    default:
      return state;
  }
}

function makeTest(){
  return {
     type: MAKE_TEST,
  }
}

// Selectors

const test = (state) => state[NAME];

export const selector = createStructuredSelector({
 test,
});

export const actionCreators = {
  makeTest
};
