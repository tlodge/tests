//import React, {Component} from 'react';
//import {configNode} from 'utils/ReactDecorators';

//@configNode()
console.log("--> react is", React);

const {configNode} = ConfigNode;
console.log("confognode is", configNode);
const store = storelib.get();
console.log("ok nice - have store", store);

@configNode()
export default class Node extends React.Component {
  	render() {
  		console.log("react is", React);
        return  <div>
          			<h1> good morning </h1>
            	</div>
    }
}