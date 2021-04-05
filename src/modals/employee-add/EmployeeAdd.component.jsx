import React from "react";
import { send } from "../../shared/service";

const EmployeeAdd = () => {
    return (
        <div>
            Add modal
            <button onClick={() => {send("ADD_EMPLOYEE")}}>Add the new employee</button>
        </div>
    );
}

export default EmployeeAdd;
