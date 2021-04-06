import React from "react";
import { useService } from "@xstate/react";
import { service } from "../../shared/service.js";
import Employees from "./employees/Employees.component";
import "./home.scss";

const Home = () => {
    const [state, send] = useService(service);

    return (
        <div className="home p-4">
            <div className="home__title-bar d-flex pb-4 justify-content-between">
                <h1>Employees</h1>
                <div>
                    <button type="button" className="btn-sm btn-primary" onClick={() => {send("MODAL_ADD_EMPLOYEE")}}>
                        Add Employee
                    </button>
                </div>
            </div>
            <Employees />
        </div>
    );
}

export default Home;
