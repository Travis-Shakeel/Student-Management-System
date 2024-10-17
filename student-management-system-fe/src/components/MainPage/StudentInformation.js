import React from "react";
import "./StudentInformation.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const StudentInformation = () => {
    const [studentInfo, setStudentInfor] = useState({});
    useEffect(() => {
        fetchProducts();
    }, []);

    let id = localStorage.getItem("id");


    const fetchProducts = async () => {
        const url = "http://localhost:5000/api/students/" + id;
        axios
            .get(url)
            .then((res) => {
                console.log(res.data.student);
                setStudentInfor(res.data.student);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div>
                <div className="user-info">
                    <div>
                        <br />
                        <h1 className="header">User Information</h1>
                    </div>
                    <div className="info">
                        <p className="info-text">
                            <b>Name:</b>
                        </p>
                        <p className="info-text">
                            {studentInfo.name}
                        </p>
                        <br />
                        <p className="info-text">
                            <b>Email:</b>
                        </p>
                        <p className="info-text">
                            {studentInfo.email}
                        </p>
                        <br />
                        <p className="info-text">
                            <b>Address:</b>
                        </p>
                        <p className="info-text">
                            {studentInfo.address}
                        </p>
                        <br />
                        <p className="info-text">
                            <b>Phone-Number:</b>
                        </p>
                        <p className="info-text">
                            {studentInfo.phone_Number}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
