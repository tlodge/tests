const NODE_UPDATE_VALUE       = 'iot.red/nodes/NODE_UPDATE_VALUE';
const NODE_UPDATE_SCHEMA      = 'iot.red/nodes/NODE_UPDATE_SCHEMA';
const NODE_UPDATE_DESCRIPTION = 'iot.red/nodes/NODE_UPDATE_DESCRIPTION';

function updateNode(property, value){
  return {
    type: NODE_UPDATE_VALUE,
    property,
    value,
  }
}

function updateDescription(id, description){
  return {
    type: NODE_UPDATE_DESCRIPTION,
    id,
    description,
  }
}

function updateSchema(id, schema){
  return {
    type: NODE_UPDATE_SCHEMA,
    id,
    schema,
  }
}

export const actionCreators = {
  updateNode,
  updateSchema,
  updateDescription,
}