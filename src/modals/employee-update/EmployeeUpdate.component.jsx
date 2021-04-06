import React from "react";
import { service } from "../../shared/service.js";
import { useService } from "@xstate/react";
import EmployeeDetails from "../../shared/components/employee-details/EmployeeDetails.component";

const EmployeeUpdate = () => {
    const [{context}, send] = useService(service);
    return (
        <>
            {context.selectedEmployee && 
                <EmployeeDetails info={context.selectedEmployee.info} index={context.selectedEmployee.index} type={"UPDATE_EMPLOYEE"}/>
            }
        </>
    )
}

export default EmployeeUpdate;
