import "./Homepage.css";
import logo from "../images/logo.png";
import { useState } from "react";
import React from "react";

function Homepage() {
    async function studentLoginhandler(e) {
        e.preventDefault();
        window.location.href = "/studentLogin";
    }

    async function adminLoginhandler(e) {
        e.preventDefault();
        window.location.href = "/adminLogin";
    }

    return (
        <div className="HomePageTopDiv">
            <meta
                className="viewport"
                content="width=device-width, intial-scale=1"
            ></meta>
            <div className="HomePageBackground"></div>

            <div className="HomePageContent">
                <center>
                    <h1 className="HomePageHeading">
                        Welcome to Student Management System
                    </h1>
                    <br></br>
                    {/* https://pixabay.com/photos/students-computers-laptops-smiling-1807505/ */}
                    <img src={logo} className="LogoPicture" />
                    <br></br>
                    <div className="text-center HomePageInsideDiv">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                            type="submit"
                            onClick={studentLoginhandler}
                        >
                            Student Login
                        </button>

                        <br></br>
                        <br></br>

                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                            type="submit"
                            onClick={adminLoginhandler}
                        >
                            Admin Login
                        </button>
                    </div>
                </center>
            </div>
        </div>
    );
}

export default Homepage;
