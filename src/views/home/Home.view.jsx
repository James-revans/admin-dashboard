import React from "react";
import { send } from "../../shared/service";
import "./home.scss";

const Home = () => {
    return (
        <div className="home p-4">
            <h1>Employees</h1>
                <button type="button" className="btn btn-primary" onClick={() => {send("MODAL_ADD_EMPLOYEE")}}>
                Add Employee
            </button>
        </div>
    );
}

export default Home;
