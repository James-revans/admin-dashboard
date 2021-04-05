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
                    actions: raise("HOME")
                }
            },

            after: {
                100: "home"
            },
        },
        
        home: {
            meta: {
                component: Home
            }
        }
    }
}