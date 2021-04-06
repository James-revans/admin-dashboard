import { interpret, Machine, assign } from "xstate";
import ComponentTree from "xstate-component-tree";
import config from "./machines/main.machine";
import services from "./services/services";

const modifiedConfig = {
    ...config,
    on: {
        ...config.on,
        UPDATE_COMPONENT_TREE: {
            actions: assign({
                componentTree: (context, { data: tree }) => tree
            })
        }
    },

    context: {
        ...config.context,
        componentTree: []
    }
}

const machine = Machine(modifiedConfig, {services});
const service = interpret(machine)
    .start();

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

const { send } = service;
export { send, service };