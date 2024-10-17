import "./AdminLogin.css";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useAlertContext } from "../context/AlertContext";
import {AiFillEye} from 'react-icons/ai'

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { sendAlert } = useAlertContext();

    async function backHandler(e) {
        e.preventDefault();
        window.location.href = "/";
    }

    async function submitHandler(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        localStorage.setItem("id", data.id);

        if (data.found) {
            sendAlert("Login Successfull", "success");
            window.location.href = "/adminPage";
        } else {
            sendAlert("Wrong Email and Password", "error");
        }
        console.log(data);
    }

    function myFunction(e) {
        e.preventDefault();
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
    return (
        <div className="flex items-center h-screen w-full TopDiv ">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded BackButton "
                onClick={backHandler}
            >
                {" "}
                Back
            </button>
            <div className="w-full rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto Bottomdiv">
                <span className="block w-full text-xl uppercase font-bold mb-4">
                    Admin Login
                </span>
                <form className="mb-4" action="/" method="post">
                    <div className="mb-4 md:w-full">
                        <label for="email" className="block text-l mb-1">
                            Username
                        </label>
                        <input
                            className="w-full border rounded p-2 outline-none focus:shadow-outline"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="mb-4 md:w-full">
                        <label for="password" className="block text-l mb-1">
                            Password
                        </label>

                        <input
                            className="w-full border rounded p-2 outline-none focus:shadow-outline"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                         <button type="button" className="Visible" onClick={myFunction} ><AiFillEye size={20}></AiFillEye></button>
                    </div>
                    <div className="col-md-12 text-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                            type="submit"
                            onClick={submitHandler}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
