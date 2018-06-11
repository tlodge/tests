// @flow

import { createStructuredSelector, createSelector } from 'reselect';
import { get } from '../../utils/net'
import { State, Button } from '../../models/buttons';
import { testbuttons } from './testbuttons'
// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const LOAD_BUTTONS = 'buttonkit/buttons/LOAD_BUTTONS';
const FETCHING_BUTTONS = 'buttonkit/buttons/FETCHING_BUTTONS';
const SET_FILTER = 'buttonkit/buttons/SET_FILTER';
const SET_CATEGORY = 'buttonkit/buttons/SET_CATEGORY';
const BUTTON_CLICKED = 'buttonkit/buttons/BUTTON_CLICKED';

// This will be used in our root reducer and selectors

export const NAME = 'buttons';

const initialState: State = {
  categories: [],
  buttons: [],
  buttonsById: {},
  filter: "",
  category: "",
  selectedButtonId: "",
};

/*
export const testbuttons = [
    {
        "category": "Security",
        "categoryId": "118",
        "buttons": [
            {
                "buttonId": "usersbutton",
                "name": "moosers",
                "description": "users",
                "type": "information",
                "batch": false,
                "returntype": "users"
            }
        ]
    },
    {
        "category": "Concierge",
        "categoryId": "116",
        "buttons": [
*/

export default function reducer(state: State = initialState, action: any = {}): State {
  switch (action.type) {

    case LOAD_BUTTONS:

      const categories = action.buttons.reduce((acc, button) => {
        acc[button.category] = button;
        return acc;
      }, []);

      const _state = Object.keys(categories).reduce((acc, key) => {
        return {
          categories: [...acc.categories || [], categories[key]],
          buttons: [...acc.buttons || [], ...categories[key].buttons.map(b => b.buttonId)],
          buttonsById: categories[key].buttons.reduce((acc, b) => {
            return { ...acc, [b.buttonId]: b }
          }, acc.buttonsById || {})
        }
      }, { categories: [], buttons: [], buttonsById: {} })

      console.log("state is ", _state);
      return {
        ...state,
        categories: _state.categories,
        buttons: _state.buttons,
        buttonsById: _state.buttonsById,
      };

    case SET_FILTER:
      return { ...state, filter: action.filter };

    case SET_CATEGORY:
      return { ...state, category: action.category };

    case BUTTON_CLICKED:
      return { ...state, selectedButtonId: action.buttonId };

    default:
      return state;
  }
}

function fetchingButtons() {
  return {
    type: FETCHING_BUTTONS,
  }
}
// Action Creators
function fetchButtons() {
  console.log("gfecthing buttons");
  return (dispatch, getState) => {
    //console.log(testbuttons);

    //dispatch(loadButtons(testbuttons));
    dispatch(fetchingButtons());

    //get('http://127.0.0.1:8080/buttonstore/buttons.json').then((body) => {
    get('http://127.0.0.1:8080/panel/buttons').then((body) => {
      console.log(body);
      dispatch(loadButtons(body));
    }).catch((err) => {
      console.log("Seen a network error!!", err);
      throw err;
    });
  }
}

function loadButtons(buttons: Array<Button>) {
  return {
    type: LOAD_BUTTONS,
    buttons
  };
}

function setFilter(filter: string) {
  return {
    type: SET_FILTER,
    filter
  }
}

function selectCategory(category: string) {
  return {
    type: SET_CATEGORY,
    category
  }
}

function buttonClicked(buttonId: string) {
  return {
    type: BUTTON_CLICKED,
    buttonId,
  }
}

const categories = (state) => state[NAME].categories;
const filter = (state) => state[NAME].filter.trim();
const selectedButtonId = (state) => state[NAME].selectedButtonId;
const category = (state) => state[NAME].category;

const filtered = createSelector([categories, filter, category], (categories, filter, category) => {

  //if category is selected, just return all of the buttons in this category   
  if (category !== "") {

    const cat = categories.filter(c => c.category === category).reduce((acc, item) => {
      return item;
    }, null);

    return cat ? cat.buttons.map(btn => { return { ...btn, layout: "button" } }) : [];
  }

  //if a filter is set, return all buttons that match
  if (filter !== "") {
    return categories.reduce((acc, category) => {
      return [
        ...acc,
        ...category.buttons.filter(button => button.name.toLowerCase().indexOf(filter.toLowerCase()) != -1).map(btn => { return { ...btn, layout: "button" } })
      ]
    }, [])
  }


  //finally, non-mobile, non-filtered, so flatten the categories to display all buttons
  return categories.reduce((acc, category) => {
    return [
      ...acc,
      ...category.buttons.map(btn => { return { ...btn, layout: "button" } })
    ]
  }, []);

});

export const selector = createStructuredSelector({
  filtered,
  category,
  selectedButtonId,
});

export const actionCreators = {
  fetchButtons,
  setFilter,
  selectCategory,
  buttonClicked,
};
