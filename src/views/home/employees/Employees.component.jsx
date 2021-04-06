import React, { useState, useEffect } from "react";
import { useService } from "@xstate/react";
import { service } from "../../../shared/service.js";
import Employee from "../../../shared/components/employee/Employee";
import "./employees.scss";

const Employees = () => {
    const [state, send] = useService(service);

    const dict = {
        hr: "HR",
        tech: "Tech",
        marketing: "Marketing"
    };

    const [checked, setChecked] = useState({
        hr: true,
        tech: true,
        marketing: true
    });

    const updateValue = (key, val) => {
        setChecked({
            ...checked,
            [key]: val
        })
    };

    const filterEmployeeArr = () => {
        // Removing location attached to department
        // Filtering for departments equal to checked departments.
        let filtered = state.context.employees.filter((item, i) => {
            item[1].department = item[1].department.match(/([^_]+)/g)[0];
            return checked[item[1].department.toLowerCase()]
        });
        return filtered;
    }
    const [displayEmployees, setDisplayEmployees] = useState(filterEmployeeArr());

    useEffect(() => {
        setDisplayEmployees(filterEmployeeArr());
    }, [checked, state.context.employees]);

    return (
        <>
            <div className="mb-4">
                {Object.keys(dict).map(item => {
                    let name = dict[item];
                    return (
                        <label className="form-check-label me-3" for={item}>
                            <input 
                                className="form-check-input me-1 cursor-pointer" 
                                type="checkbox" 
                                value="" 
                                id={item} 
                                checked={checked[item]} 
                                onChange={() => {updateValue(item, !checked[item])}}
                            />
                            {name}
                        </label>
                    )
                })}
            </div>
            <div className="employees d-flex flex-wrap">
                {displayEmployees.map((item, i) => <Employee info={item[1]} index={i}/>)}
            </div>
        </>
    )
}

export default Employees;
