import { actions, assign } from "xstate";

import Boot from "../../views/boot/Boot.view.jsx";
import Home from "../../views/home/Home.view.jsx";

const { raise } = actions;

export default {
    id: "views",
    initial: "boot",

    on: {
        BOOT: ".boot",
        HOME: ".home",
    },
    states: {
        boot: {
            meta: {
                component: Boot
            },

            invoke: {
                src: "fetchData",
                onDone: {
                    actions: [
                        assign({
                            employees: (context, {data}) => {
                                return data;
                            }
                        }),
                        raise("HOME")
                    ]
                }
            },
        },
        
        home: {
            meta: {
                component: Home
            }
        }
    }
}