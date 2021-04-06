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
            // mock API call on startup to fetch data, Once data is fetched, change to home.
            invoke: {
                src: "fetchData",
                onDone: {
                    actions: [
                        assign({
                            employees: (_, {data}) => {
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