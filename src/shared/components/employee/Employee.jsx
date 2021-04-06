import React from "react";
import { service } from "../../../shared/service";
import { useService } from "@xstate/react";

import "./employee.scss";

const Employee = ({info, index}) => {
    const [state, send] = useService(service);
    const {name, image, department, location} = info;

    const openDetails = () => {
        send({
            type: "MODAL_UPDATE_EMPLOYEE_PREP", 
            data: {info, index}
        })
    };
    
    return (
        <div className="employee mb-4 p-2 text-center cursor-pointer" onClick={openDetails}>
            <img src={image} className="employee__img"/>
            <h6 className="employee__name pt-2">{name}</h6>
            <p className="mb-2">{department}</p>
            <p>{location}</p>
        </div>
    );
}

export default Employee;
