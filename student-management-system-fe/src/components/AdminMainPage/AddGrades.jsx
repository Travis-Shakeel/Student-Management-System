import React, { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./AddGrades.css";
import { useAlertContext } from "../../context/AlertContext";
import axios from "axios";
export const AddGrades = () => {
    const [letter_grade, setLetterGrade] = useState("");
    const [course_id, setCourseId] = useState(0);
    const [email, setEmail] = useState("");
    const { sendAlert } = useAlertContext();
    
    async function submitHandler(e) {
        e.preventDefault();
        const url = "http://localhost:5000/api/students/grades/" + email;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                letter_grade,
                course_id,
            }),
        });

        const data = await response.json();
        sendAlert(JSON.stringify(data));
    }

    return (
        <>
            <div>
                <div>
                    <form onSubmit={submitHandler} className="form-container">
                        <div>
                            <label>Student's Email: </label>
                            <input
                                type="email"
                                name="eamil"
                                className="brd"
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            ></input>
                        </div>
                        <br></br>
                        <div>
                            <label>Letter Grade: </label>
                            <select
                                type="text"
                                id="grades"
                                name="grades"
                                className="brd"
                                onChange={(e) => setLetterGrade(e.target.value)}
                            >
                                <option value="0"> </option>
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="C-">C-</option>
                                <option value="D+">D+</option>
                                <option value="D">D</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                        <br></br>
                        <div>
                            <label>Course Code: </label>
                            <select
                                type="number"
                                name="courses"
                                className="brd"
                                onChange={(e) => setCourseId(e.target.value)}
                                required
                            >
                                <option></option>
                                <option value="111">Cpsc 457</option>
                                <option value="112">Cpsc 441</option>
                                <option value="113">Cpsc 449</option>
                                <option value="114">Cpsc 411</option>
                                <option value="115">Cpsc 413</option>
                                <option value="116">Cpsc 418</option>
                                <option value="117">Cpsc 433</option>
                                <option value="118">Cpsc 461</option>
                                <option value="119">Cpsc 471</option>
                                <option value="120">Cpsc 491</option>
                                <option value="121">Cpsc 499</option>
                                <option value="122">Cpsc 502</option>
                            </select>
                        </div>
                        <br></br>
                        <div>
                            <Button
                                type="submit"
                                colorScheme="blue"
                                className="butn"
                            >
                                Add Grades
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
