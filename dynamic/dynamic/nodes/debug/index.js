//import { render } from 'react-dom';
import Node from "./node";

//import React from 'react';

const store = storelib.get();
const {dispatch} = store;
//pass in store here!!!!!


export function run(){
	//console.log("extranal React is", React);
	console.log("triggering a render!");
	console.log("passing in store as prop", store);
	
	const props = {
		store,
	}

	ReactDOM.render(<Node {...props}/>, document.getElementById('node'));
	dispatch({type:'test/MAKE_TEST'});
}