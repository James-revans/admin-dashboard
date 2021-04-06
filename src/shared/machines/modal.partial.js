import { assign, actions } from "xstate";
import Modal from "../../shared/components/modal/Modal";
import EmployeeAdd from "../../modals/employee-add/EmployeeAdd.component";
import EmployeeUpdate from "../../modals/employee-update/EmployeeUpdate.component";

const { raise } = actions;

export default {
    initial : "hidden",
    
    on : {
        MODAL_ADD_EMPLOYEE: ".show.openEmployeeAdd",
        MODAL_UPDATE_EMPLOYEE_PREP: {
            actions: [
                assign({
                    selectedEmployee: (_, {data}) => data,
                }),
                raise("MODAL_UPDATE_EMPLOYEE")
            ] 
        },
        MODAL_UPDATE_EMPLOYEE: ".show.openEmployeeUpdate",
        MODAL_CLOSE: ".hidden",
    },

    states : {
        hidden: {
            entry: assign({selectedEmployee: null})
        },
        show: {
            //modal component wraps my modals
            meta: {
                component: Modal,
            },
            
            states: {
                openEmployeeAdd: {
                    meta: {
                        component: EmployeeAdd,
                    },
                    on: {
                        ADD_EMPLOYEE: {
                            // Add the new employee to our employees[] in context and then close the modal
                            actions: [
                                assign({
                                    employees: ({ employees }, {data}) => [data.info, ...employees]
                                }),
                                raise("MODAL_CLOSE")
                            ]
                        }
                    }
                },
                openEmployeeUpdate: {
                    meta: {
                        component: EmployeeUpdate,
                    },
                    on: {
                        UPDATE_EMPLOYEE: {
                            // Update the data for the specified employee and then close the modal
                            actions: [
                                assign({
                                    employees: ({ employees }, {data}) => {
                                        let modifiedEmployees = employees;
                                        modifiedEmployees[data.index] = data.info;
                                        return [...modifiedEmployees];
                                    },
                                    selectedEmployee: null
                                }),
                                raise("MODAL_CLOSE")
                            ]
                        }
                    } 
                }
            }
        }
    },
};
