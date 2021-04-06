import { interpret, Machine, assign } from "xstate";
import ComponentTree from "xstate-component-tree";
import config from "./machines/main.machine";
import services from "./services/services";

const modifiedConfig = {
    ...config,
    on: {
        ...config.on,
        // This updates the component tree whenever state changes
        UPDATE_COMPONENT_TREE: {
            actions: assign({
                componentTree: (_, { data: tree }) => tree
            })
        }
    },

    // adding the tree in context to reference in App.js
    context: {
        ...config.context,
        componentTree: []
    }
}

const machine = Machine(modifiedConfig, {services});
const service = interpret(machine)
    .start();

// This builds the component tree and sends an event for it to be saved to context whenver state changes.
// This will tell us what components should be rendered depending on where we are in our state machine. 
// We'll loop through this in App.js to render each component.
let _cacheTree = null;
new ComponentTree(service, (treeValue) => {
    if (JSON.stringify(_cacheTree) === JSON.stringify({ ...treeValue})) {
        return;
    } else {
        _cacheTree = {...treeValue};
        return service.send({
            type : "UPDATE_COMPONENT_TREE",
            data : treeValue,
        })
    }
});

export { service };