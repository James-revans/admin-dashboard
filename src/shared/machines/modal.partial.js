import { assign } from "xstate";
import Modal from "../../shared/components/modal/Modal";
import EmployeeAdd from "../../modals/employee-add/EmployeeAdd.component";
import EmployeeDetails from "../../modals/employee-details/EmployeeDetails.component";

export default {
    initial : "hidden",
    
    on : {
        MODAL_ADD_EMPLOYEE: ".show.openEmployeeAdd",
        MODAL_EMPLOYEE_DETAILS: ".show.openEmployeeDetails",
        MODAL_CLOSE: ".hidden",
    },

    states : {
        hidden: {},
        show: {
            //modal component wraps my modals
            meta: {
                component: Modal
            },
            
            states: {
                openEmployeeAdd: {
                    meta: {
                        component: EmployeeAdd
                    },
                    on: {
                        ADD_EMPLOYEE: {
                            actions: assign({
                                employees: ({ employees }, newEmployee) => [...employees, "new"]
                            })
                        }
                    }
                },
                openEmployeeDetails: {
                    meta: {
                        component: EmployeeDetails
                    },
                    on: {
                        SAVE_DETAILS: {
                            actions: assign({
                                employees: ({ employees }, newEmployee) => employees.push("new")
                            })
                        }
                    }
                }
            }
        }
    },
};
