import React from "react";
import { useState } from "react";
import "./EditPage.css";
import { useRef } from "react";
import { useAlertContext } from "../../context/AlertContext";

export const EditAccount = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const pas1Ref = useRef(null);
    const pas2Ref = useRef(null);
    const { sendAlert } = useAlertContext();
    async function submitPersonalInformationHandler(e) {
        e.preventDefault();
        const id = localStorage.getItem("id");
        const url = "http://localhost:5000/api/students/edit/" + id;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phoneNumber,
                address,
            }),
        });
        const data = await response.json();
        sendAlert(data);
    }

    async function submitPasswordInformationHandler(event) {
        event.preventDefault();
        const id = localStorage.getItem("id");
        if (password == confPassword) {
            const url = "http://localhost:5000/api/students/editPassword/" + id;
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                }),
            });
            const data = await response.json();
            sendAlert(data);
            setPassword("");
            setConfPassword("");
        } else {
            sendAlert("Password and Confirm Password do not match", "error");
            setPassword("");
            setConfPassword("");
        }
    }

    return (
        <>
            <div className="EditPageTopDiv">
                <div className="EditPageContent">
                    <center>
                        <form className="EditPageForm">
                            <h2>
                                <strong>Edit Personal Information:</strong>
                            </h2>

                            <br></br>

                            <label className="AddressText">Address</label>
                            <br></br>
                            <input
                                type="text"
                                id="Address"
                                name="Address"
                                placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <br></br>
                            <br></br>

                            <label for="PhoneNumber">Phone Number</label>
                            <br></br>
                            <input
                                type="text"
                                id="PhoneNumber"
                                name="PhoneNumber"
                                placeholder="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <br></br>
                            <br></br>

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                                onClick={submitPersonalInformationHandler}
                            >
                                Update Personal Information
                            </button>
                            <br></br>
                            <br></br>

                            <br></br>
                            <h2>
                                <strong>Edit Password:</strong>
                            </h2>

                            <br></br>

                            <label for="Password">Password</label>
                            <br></br>

                            <input
                                ref={pas1Ref}
                                type="password"
                                id="Password"
                                name="Password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br></br>
                            <br></br>
                            <input
                                ref={pas2Ref}
                                type="password"
                                id="Password"
                                name="Password"
                                value={confPassword}
                                placeholder="Confirm Password"
                                onChange={(e) =>
                                    setConfPassword(e.target.value)
                                }
                            />
                            <br></br>
                            <br></br>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                                onClick={submitPasswordInformationHandler}
                            >
                                Update Password
                            </button>
                        </form>
                        <br></br>
                        <div className="text-center EditPageInsideDiv">
                            <form></form>
                        </div>
                    </center>
                </div>
            </div>
        </>
    );
};
