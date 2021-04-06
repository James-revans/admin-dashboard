import React from "react";
import { service } from "../../service.js";
import { useService } from "@xstate/react";
import { useState, useEffect } from "react";
import "./employeeDetails.scss";

const EmployeeDetails = ({info, index, type}) => {
    const [state, send] = useService(service);
    const [employeeData, setEmployeeData] = useState();
    const [details, setDetails] = useState(info);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        if(employeeData) {
            let data = {
                info: [details.name, employeeData],
                index
            };
            send({
                type,
                data
            })
        }
    }, [employeeData]);

    // Checking to ensure all inputs aren't null. Updating department field to show like the original data
    const buildEmployeeData = () => {
        for (const val in details) {
            if (!details[val]) {
                setShowWarning(true) 
                return;
            }
        }
        setEmployeeData({
            ...details, 
            department: `${details.department}_${details.location}`
        })
    };

    const uploadImage = (e) => {
        let reader = new FileReader();

        reader.onload = function (e) {
            setDetails({
                ...details,
                image: e.target.result
            })
        }
        reader.readAsDataURL(document.getElementById("img").files[0]);
    }

    return (
        <div className="d-flex flex-column employee-details">
            <label for="img">Select image
                <input type="file" className="cursor-pointer form-control mb-4" id="img" name="image" accept="image/*" onChange={uploadImage}></input>
            </label>
            <img src={details.image} id="employee-img" className="employee-details__img rounded"/>

            <label className="mt-4">
                Username:
                <input name="name" className="form-control mb-4" type="text" placeholder="Username" value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})} />
            </label>
            <label>
                Department:
                <select name="department" className="cursor-pointer form-control mb-4" value={details.department} onChange={(e) => setDetails({...details, department: e.target.value})}>
                    <option value="" disabled selected>Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Tech">Tech</option>
                </select>            
            </label>
            <label>
                Paygrade:
                <select name="paygrade" className="cursor-pointer form-control mb-4" value={details.paygrade} onChange={(e) => setDetails({...details, paygrade: e.target.value})}>
                    <option value="" disabled selected>Select Paygrade</option>
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                </select>           
            </label>
            <label>
                Location:
                <select name="location" className="cursor-pointer form-control mb-4" value={details.location} onChange={(e) => setDetails({...details, location: e.target.value})}>
                    <option value="" disabled selected>Select Location</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Hangzhou">Hangzhou</option>
                    <option value="Mexico City">Mexico City</option>
                    <option value="Montreal">Montreal</option>
                    <option value="Mumbai">Mumbai</option>
                </select>
            </label>
            {showWarning &&
                <div className="employee-details__warning">
                    <p>Please fill out all fields before saving!</p>
                </div>
            }
            <div className="d-flex justify-content-between w-100">
                <button className="btn btn-primary" onClick={buildEmployeeData}>Save Employee</button>
                <button className="btn btn-secondary" onClick={() => send("MODAL_CLOSE")}>Cancel</button>
            </div>
        </div>
    )
}

export default EmployeeDetails;
