import React, {PropTypes, Component} from 'react';

export function contextTypes(cType) {
    return function (DecoratedComponent) {
        DecoratedComponent.contextTypes = cType;
        return DecoratedComponent;
    }
}

export function configNode(){  
  return function (DecoratedComponent){
    
      return class Config extends Component {
        render(){
            return  <div>
                      <h1> component </h1>
                      <DecoratedComponent {...props}/>
                    </div>
        }
      }
   }
}