import React from "react";
import EmployeeDetails from "../../shared/components/employee-details/EmployeeDetails.component";

const EmployeeAdd = () => {
    const defaultInfo = {
        department: null,
        image: "images/avatar/default.png",
        name: null,
        paygrade: null,
        location: null,
    }
    
    return (
        <EmployeeDetails info={defaultInfo} type={"ADD_EMPLOYEE"}/>
    )
}

export default EmployeeAdd;
