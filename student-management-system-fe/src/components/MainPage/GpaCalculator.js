import "./GpaCalculator.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

function GpaCalculator() {
    let [credits1, setCredits1] = useState("");
    let [credits2, setCredits2] = useState("");
    let [credits3, setCredits3] = useState("");
    let [credits4, setCredits4] = useState("");
    let [credits5, setCredits5] = useState("");
    let [credits6, setCredits6] = useState("");
    let [gpaC, setGPAC] = useState(0);

    const [grade1, setGrade1] = useState("");
    const [grade2, setGrade2] = useState("");
    const [grade3, setGrade3] = useState("");
    const [grade4, setGrade4] = useState("");
    const [grade5, setGrade5] = useState("");
    const [grade6, setGrade6] = useState("");

    let [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setGPAC(calculateGpa());
        setShow(true);
    };

    function calculateGpa() {
        if (credits1.length == 0) {
            credits1 = 0;
        }

        if (credits2.length == 0) {
            credits2 = 0;
        }

        if (credits3.length == 0) {
            credits3 = 0;
        }

        if (credits4.length == 0) {
            credits4 = 0;
        }

        if (credits5.length == 0) {
            credits5 = 0;
        }

        if (credits6.length == 0) {
            credits6 = 0;
        }

        let credits =
            parseInt(credits1) +
            parseInt(credits2) +
            parseInt(credits3) +
            parseInt(credits4) +
            parseInt(credits5) +
            parseInt(credits6);
        let gpa =
            credits1 * grade1 +
            credits2 * grade2 +
            credits3 * grade3 +
            credits4 * grade4 +
            credits5 * grade5 +
            credits6 * grade6;
        gpa = gpa / credits;
        gpa = gpa.toFixed(2);
        return gpa;
    }

    return (
        <div>
            <div className="gpa-form">
                <h1 className="header">GPA Calculator</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="course0">
                        <div>
                            <b>
                                <h2 className="header-Text">Courses</h2>
                            </b>
                        </div>
                        <div>
                            <b>
                                <h2 className="header-Text">Credits</h2>
                            </b>
                        </div>
                        <div>
                            <b>
                                <h2 className="header-Text">Grade</h2>
                            </b>
                        </div>
                    </div>
                    <div className="course1">
                        <div>
                            <label>Course 1: </label>
                        </div>
                        <div>
                            <input
                                id="credits"
                                type="number"
                                defaultValue={0}
                                onChange={(e) => setCredits1(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <select
                                id="grades"
                                name="grades"
                                onChange={(e) => setGrade1(e.target.value)}
                            >
                                <option value="0"> </option>
                                <option value="4.0">A+</option>
                                <option value="4.0">A</option>
                                <option value="3.70">A-</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.00">B</option>
                                <option value="2.70">B-</option>
                                <option value="2.30">C+</option>
                                <option value="2.00">C</option>
                                <option value="1.70">C-</option>
                                <option value="1.30">D+</option>
                                <option value="1.00">D</option>
                                <option value="0">F</option>
                            </select>
                        </div>
                    </div>
                    <div className="course2">
                        <div>
                            <label>Course 2: </label>
                        </div>
                        <div>
                            <input
                                id="credits"
                                type="number"
                                defaultValue={0}
                                onChange={(e) => setCredits2(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <select
                                id="grades"
                                name="grades"
                                onChange={(e) => setGrade2(e.target.value)}
                            >
                                <option value="0"> </option>
                                <option value="4.0">A+</option>
                                <option value="4.0">A</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.00">B</option>
                                <option value="2.70">B-</option>
                                <option value="2.30">C+</option>
                                <option value="2.00">C</option>
                                <option value="1.70">C-</option>
                                <option value="1.30">D+</option>
                                <option value="1.00">D</option>
                                <option value="0">F</option>
                            </select>
                        </div>
                    </div>
                    <div className="course2">
                        <div>
                            <label>Course 3: </label>
                        </div>
                        <div>
                            <input
                                id="credits"
                                type="number"
                                defaultValue={0}
                                onChange={(e) => setCredits3(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <select
                                id="grades"
                                name="grades"
                                onChange={(e) => setGrade3(e.target.value)}
                            >
                                <option value="0"> </option>
                                <option value="4.0">A+</option>
                                <option value="4.0">A</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.00">B</option>
                                <option value="2.70">B-</option>
                                <option value="2.30">C+</option>
                                <option value="2.00">C</option>
                                <option value="1.70">C-</option>
                                <option value="1.30">D+</option>
                                <option value="1.00">D</option>
                                <option value="0">F</option>
                            </select>
                        </div>
                    </div>
                    <div className="course2">
                        <div>
                            <label>Course 4: </label>
                        </div>
                        <div>
                            <input
                                id="credits"
                                type="number"
                                defaultValue={0}
                                onChange={(e) => setCredits4(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <select
                                id="grades"
                                name="grades"
                                onChange={(e) => setGrade4(e.target.value)}
                            >
                                <option value="0"> </option>
                                <option value="4.0">A+</option>
                                <option value="4.0">A</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.00">B</option>
                                <option value="2.70">B-</option>
                                <option value="2.30">C+</option>
                                <option value="2.00">C</option>
                                <option value="1.70">C-</option>
                                <option value="1.30">D+</option>
                                <option value="1.00">D</option>
                                <option value="0">F</option>
                            </select>
                        </div>
                    </div>
                    <div className="course2">
                        <div>
                            <label>Course 5: </label>
                        </div>
                        <div>
                            <input
                                id="credits"
                                type="number"
                                defaultValue={0}
                                onChange={(e) => setCredits5(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <select
                                id="grades"
                                name="grades"
                                onChange={(e) => setGrade5(e.target.value)}
                            >
                                <option value="0"> </option>
                                <option value="4.0">A+</option>
                                <option value="4.0">A</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.00">B</option>
                                <option value="2.70">B-</option>
                                <option value="2.30">C+</option>
                                <option value="2.00">C</option>
                                <option value="1.70">C-</option>
                                <option value="1.30">D+</option>
                                <option value="1.00">D</option>
                                <option value="0">F</option>
                            </select>
                        </div>
                    </div>
                    <div className="course2">
                        <div>
                            <label>Course 6: </label>
                        </div>
                        <div>
                            <input
                                id="credits"
                                type="number"
                                defaultValue={0}
                                onChange={(e) => setCredits6(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <select
                                id="grades"
                                name="grades"
                                onChange={(e) => setGrade6(e.target.value)}
                            >
                                <option value="0"> </option>
                                <option value="4.0">A+</option>
                                <option value="4.0">A</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.70">A-</option>
                                <option value="3.30">B+</option>
                                <option value="3.00">B</option>
                                <option value="2.70">B-</option>
                                <option value="2.30">C+</option>
                                <option value="2.00">C</option>
                                <option value="1.70">C-</option>
                                <option value="1.30">D+</option>
                                <option value="1.00">D</option>
                                <option value="0">F</option>
                            </select>
                        </div>
                    </div>
                    <div className="button">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Calculate GPA
                        </button>
                    </div>
                </form>
                {show && (
                    <div>
                        <p className="showGPA">
                            Your GPA is <b>{gpaC}</b>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GpaCalculator;
