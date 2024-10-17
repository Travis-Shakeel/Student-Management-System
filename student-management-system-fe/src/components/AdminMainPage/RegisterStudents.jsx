import React from "react";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
import "./RegisterStudent.css";
import { useAlertContext } from "../../context/AlertContext";

export const RegisterStudents = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [fetchedData, setFetchedData] = useState([{}]);
    const { sendAlert } = useAlertContext();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const url = "http://localhost:5000/api/students";
        axios
            .get(url)
            .then((res) => {
                console.log(res.data);
                setFetchedData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    async function submitHandler(e) {
        e.preventDefault();
        if (password != confPassword) {
            sendAlert("Password does not match", "error");
        } else if (
            password.length >= 7 &&
            password == confPassword &&
            phoneNumber.length == 10 &&
            phoneNumber.match("[0-9]+")
        ) {
            const response = await fetch(
                "http://localhost:5000/api/students/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phoneNumber,
                        address,
                        password,
                    }),
                }
            );

            const data = await response.json();
            sendAlert(JSON.stringify(data));
        }
        else {
            sendAlert("Invalid Fields");
        }
    }

    async function removeHandler(e) {
        e.preventDefault();
        const url = "http://localhost:5000/api/admin/removeStudent/" + email;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        sendAlert(JSON.stringify(data));
    }

    return <>
        <h1 className="reg-student-title">Register Student</h1>
        <section className="reg-student-bg">
            <div className="flex-cont">
            <div className="reg-form-container">
                <form className="register-form-title" onSubmit={submitHandler}>
                    <div>
                        <h1 className="register-Header"> Register Student Form</h1>
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" placeholder=" Enter Student's Name" size={25} onChange={(e) => setName(e.target.value)} required></input>
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" name="email" placeholder=" Enter Student's Email" size={25} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input type="text" name="phoneNumber" placeholder=" Enter Student's Phone Number" size={25} onChange={(e) => setPhoneNumber(e.target.value)} required></input>
                    </div>

                    <div>
                        <label>Address: </label>
                        <input type="text" name="address" placeholder=" Enter Student's Address" size={25} onChange={(e) => setAddress(e.target.value)} required></input>
                    </div>

                    <div>
                        <label>Password: </label>
                        <input type="password" name="pswd" placeholder=" Password" size={25} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>

                    <div>
                        <label>Confirm Password: </label>
                        <input type="password" name="cpswd" placeholder=" Confirm Password" size={25} onChange={(e) => setConfPassword(e.target.value)} required></input>
                    </div>
                    <div>
                        <Button type="submit" colorScheme='blue' className="butn">Register Student</Button>
                    </div>
                </form>
            </div>
            <br></br>
            <br></br>
            <div className="reg-remove-container">
                <div>
                    <h1 className="remove-title">Remove Student</h1>
                </div>
                <form className="remove-section" onSubmit={removeHandler}>
                    <table>
                        <tr>
                            <td>
                                <p className="rem-text">Select Student</p>
                            </td>

                        </tr>
                       
                        <tr>
                            <td>
                                <select type="text" name='courses' onChange={(e) => setEmail(e.target.value)} required>
                                    <option></option>
                                    {fetchedData.map((student) => (<option value={student.email}>{student.name}</option>))}
                                </select>
                            </td>
                        </tr>
                        <br></br>
                        <tr>
                            <td>


                                <Button type="submit" colorScheme='red' className="remove-btn">Remove Student</Button>

                            </td>
                        </tr>
                    </table>
                </form>
                </div>
            </div>
        </section>
    </>;
};
