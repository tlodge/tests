webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__test__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__test__["b"]; });
/* unused harmony reexport selector */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__test__["a"]; });





/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_features_test__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(12);


const {dispatch} = storelib.configureStore(__WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* default */]);
dispatch(__WEBPACK_IMPORTED_MODULE_0_features_test__["b" /* actionCreators */].makeTest())


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = reducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);


// Action Types
const MAKE_TEST = 'test/MAKE_TEST';


const NAME = 'test';
/* harmony export (immutable) */ __webpack_exports__["a"] = NAME;



const initialState = {};

// Reducer
function reducer(state = initialState, action ={}) {
  
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

const selector = Object(__WEBPACK_IMPORTED_MODULE_0_reselect__["createStructuredSelector"])({
 test,
});
/* unused harmony export selector */


const actionCreators = {
  makeTest
};
/* harmony export (immutable) */ __webpack_exports__["b"] = actionCreators;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_features_test__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_features_nodes__ = __webpack_require__(13);



/* harmony default export */ __webpack_exports__["a"] = ({
  [__WEBPACK_IMPORTED_MODULE_0_features_test__["a" /* NAME */]]: __WEBPACK_IMPORTED_MODULE_0_features_test__["c" /* default */],
  [__WEBPACK_IMPORTED_MODULE_1_features_nodes__["a" /* NAME */]]: __WEBPACK_IMPORTED_MODULE_1_features_nodes__["b" /* default */],
});



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nodes__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__nodes__["b"]; });
/* unused harmony reexport actionCreators */
/* unused harmony reexport selector */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__nodes__["a"]; });


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = reducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reselect__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_reselect__);



const NODE_WIDTH = 50;
const NAME = 'nodes';
/* harmony export (immutable) */ __webpack_exports__["a"] = NAME;


function _configureNode(current, changes){
  
  let _n = Object.assign({}, current, changes);

  try {
        _n.label  = (typeof _n._def.label  === "function" ? _n._def.label.bind(_n).call() : _n._def.label ) || _n._def.label ;
  } catch(err) {
       console.log(`Definition error: ${_n.type}.label`,err);
        _n.label = _n.nt;
  }

  if (_n._def.labelStyle){
      try{
        _n.labelStyle = (typeof _n._def.labelStyle === "function") ? _n._def.labelStyle.bind(_n).call() : _n._def.labelStyle || "";    
      }catch (err){
        console.log(`Definition error: ${d.type}.labelStyle`,err);
      }
  }
  
  //const w = Math.max(NODE_WIDTH,GRID_SIZE*(Math.ceil((calculateTextWidth(_n.label, "node_label", 50)+(_n.inputs>0?7:0))/GRID_SIZE)));
  const w = NODE_WIDTH;
  _n.w = w; 

  return _n;
}

const initialState = {
  
  nodes:['a','b','c','d'], 
  
  nodesById: {
                'a':{name:'a'}, 
                'b':{name:'b'}, 
                'c':{name:'c'}, 
                'd':{name:'d'}
  },
  
  configsById: {},
  
  draggingNode: null, 
  

  selectedId: null, 
  
  configuringId: null, 
  
  buffer: {},
}

function reducer(state = initialState, action) {
  
  let property, value, v;


  switch (action.type) {  

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].RECEIVE_FLOWS:

        return Object.assign({}, state, {
          nodes: action.nodes.map((node)=>node.id),
          nodesById: action.nodes.reduce((acc, item)=>{
            acc[item.id] = item;
            return acc;
          },{})
        })

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_CLEAR_ALL:{
        return Object.assign({}, state, initialState);
    }

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_DROPPED:
        return Object.assign({}, state, {
          nodes: [  ...state.nodes, action.node.id],
          nodesById: Object.assign({}, state.nodesById, {[action.node.id]:action.node}),
          configsById: Object.assign({}, state.configsById, {[action.node.id]:{
                                                                                fn: action.config.fn,
                                                                                id: action.config.id,
                                                                              }
                                                                            }),
        })

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_MOUSE_DOWN:
      
      return Object.assign({}, state, {
        draggingNode: action.id,
        selectedId: action.id,
      })
    
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_DOUBLE_CLICKED:
     
      return Object.assign({}, state, {
        draggingNode: null,
        selectedId: action.id,
        configuringId: action.id,
      })
   
    
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_DESELECTED:
    	return Object.assign({}, state, {
    		selectedId: null,
    	});
    
    //called from features/tabs
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].TAB_DELETE:

        return Object.assign({}, state, {
            nodes: state.nodes.filter((id)=>{
                const node = state.nodesById[id];
                return node.z != action.id;
            }),
            nodesById: Object.keys(state.nodesById).reduce((acc,key)=>{
                const node = state.nodesById[key];
                if (action.id != node.z){
                   acc[key] = node;
                }
                return acc;
            },{})
      	});

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_DELETE:
      
     
      if (!state.selectedId){
          return state;
      }
      return Object.assign({}, state, {
          nodes: state.nodes.filter(item => state.selectedId != item),
          nodesById: Object.keys(state.nodesById).reduce((acc, key)=>{
                if (key != state.selectedId){
                    acc[key] = state.nodesById[key];
                }
                return acc;
          },{})
      });

	   //set up the editing buffer by copying all saved properties from defaults into it.
	  case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_CONFIGURE:
		    const defaults = state.nodesById[action.id]._def.defaults || {};
		    const values = Object.keys(defaults).reduce((acc, key)=>{
			     acc[key] = state.nodesById[state.selectedId][key];
           //state.selected[key];
			     return acc;
		    },{});
	
	     return Object.assign({}, state, {buffer: values});
		
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_INIT_VALUES:
     
      return Object.assign({}, state, {
        buffer : Object.assign({}, state.buffer, action.keys)
      })


    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_UPDATE_VALUE:
   
      
      return Object.assign({}, state, {
        buffer : Object.assign({}, state.buffer, {[action.property]:action.value})
      })
  

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_INCREMENT_VALUE_KEY:

      property = state.buffer[action.property] || {};
      value    = property[action.key];
      v = {};

      v[action.key] = Math.max(action.min || value + action.amount, value + action.amount);
            
      const nobj = Object.assign({}, state.buffer[action.property] || {}, v);
      
      return Object.assign({}, state, {
          buffer : Object.assign({}, state.buffer, {[action.property]:nobj}),
       })
      

      return state;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_UPDATE_VALUE_KEY:
      //do some magic with the acuon value too - if array etc.
      
      property = state.buffer[action.property] || {};
      value    = property[action.key];


      if (value != undefined){
        v = {};
    
        if (value.constructor === Array){
            v[action.key] = toggleItem(value, action.value);
        }else{
             v[action.key] = action.value;
        }

        const newobject = Object.assign({}, state.buffer[action.property] || {}, v);

        return Object.assign({}, state, {
          buffer : Object.assign({}, state.buffer, {[action.property]:newobject}),
        })
      }
    
      return state;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_CONFIGURE_CANCEL:
        return Object.assign({}, state, {
          configuringId: null,
          buffer: {},
        })
    
    //set the values in current node to values in buffer
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_CONFIGURE_OK:
        if (state.configuringId){
          return Object.assign({}, state, {
            configuringId: null,
            buffer: {},
            nodesById: Object.assign({}, state.nodesById, {[state.configuringId]: _configureNode(state.nodesById[state.configuringId], state.buffer)}),
          });
        }
        return state;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].MOUSE_UP:
      return Object.assign({}, state, {
        draggingNode: null,
      });
    
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].MOUSE_MOVE:

      if (state.draggingNode != null){
        return Object.assign({}, state, {
            nodesById: Object.assign({}, state.nodesById, {[state.draggingNode]: Object.assign({}, state.nodesById[state.draggingNode], {x:action.x, y:action.y})})
        });
      }
      return state;
    
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_UPDATE_SCHEMA:
    
      return Object.assign({}, state, {
                nodesById : Object.assign({}, state.nodesById, {
                  [action.id]: Object.assign({}, state.nodesById[action.id], {schema:action.schema})
                })
            });

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* actionConstants */].NODE_UPDATE_DESCRIPTION:
    
      return Object.assign({}, state, {
                nodesById : Object.assign({}, state.nodesById, {
                  [action.id]: Object.assign({}, state.nodesById[action.id], {description:action.description})
                })
            });

	  default:
	    return state;
  }
}

const nodes = (state)=>state[NAME];
const selectedId = (state)=>state[NAME].selectedId;
const configuringId = (state)=>state[NAME].configuringId;
const node = (state, ownProps)=>state[NAME].nodesById[ownProps.id];
const buffer = (state)=>state[NAME].buffer;

const selector = Object(__WEBPACK_IMPORTED_MODULE_1_reselect__["createStructuredSelector"])({
  nodes,
  selectedId,
  configuringId,
  node,
  buffer,
});
/* unused harmony export selector */


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const actionConstants = {
	NODE_DROPPED  : 'iot.red/nodes/NODE_DROPPED',
	NODE_UPDATE_VALUE  : 'iot.red/nodes/NODE_UPDATE_VALUE',
	NODE_INIT_VALUES  : 'iot.red/nodes/NODE_INIT_VALUES',
	NODE_UPDATE_VALUE_KEY  : 'iot.red/nodes/NODE_UPDATE_VALUE_KEY',
	NODE_INCREMENT_VALUE_KEY  : 'iot.red/nodes/NODE_INCREMENT_VALUE_KEY',
	NODE_UPDATE_SCHEMA : 'iot.red/nodes/NODE_UPDATE_SCHEMA',
	NODE_UPDATE_DESCRIPTION : 'iot.red/nodes/NODE_UPDATE_DESCRIPTION',
	NODE_MOUSE_DOWN :  'iot.red/nodes/NODE_MOUSE_DOWN',
	NODE_DOUBLE_CLICKED : 'iot.red/nodes/NODE_DOUBLE_CLICKED',
 	NODE_DELETE : 'iot.red/nodes/NODE_DELETE',
	NODE_DESELECTED : 'iot.red/nodes/NODE_DESELECTED',
	NODE_CONFIGURE : 'iot.red/nodes/NODE_CONFIGURE',
	NODE_CONFIGURE_OK      : 'iot.red/nodes/NODE_CONFIGURE_OK',
	NODE_CONFIGURE_CANCEL  : 'iot.red/nodes/NODE_CONFIGURE_CANCEL',
	NODE_CLEAR_ALL:  'iot.red/nodes/NODE_CLEAR_ALL',
	RECEIVE_FLOWS  : 'iot.red/nodes/RECEIVE_FLOWS',
	TAB_DELETE : 'iot.red/nodes/TAB_DELETE',
	MOUSE_MOVE : 'iot.red/nodes/MOUSE_MOVE',
	MOUSE_UP :  'iot.red/nodes/MOUSE_UP',
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actionConstants;


/***/ })
],[10]);