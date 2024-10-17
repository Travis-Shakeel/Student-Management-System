import React from "react";
import { useState, useEffect} from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./AddSection.css";
import { useAlertContext } from "../../context/AlertContext";
import axios from "axios";

export const AddSections = () => {
    const [year, setYear] = useState();
    const [semester, setSemester] = useState("");
    const [instructor, setInstructor] = useState("");
    const [day, setDay] = useState("");
    const [location, setLocation] = useState("");
    const [courseId, setCourse] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const { sendAlert } = useAlertContext();
    const [fetchedData, setFetchedData] = useState([{}]);
    const [show, setShow] =useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const url = "http://localhost:5000/api/admin/";
        axios
            .get(url)
            .then((res) => {
                console.log(res.data);
                setFetchedData(res.data);
                setShow(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    async function submitHandler(e) {
        e.preventDefault();
        const response = await fetch(
            "http://localhost:5000/api/admin/section",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    year,
                    semester,
                    instructor,
                    day,
                    location,
                    courseId,
                    startTime,
                    endTime,
                }),
            }
        );

        const data = await response.json();
        sendAlert(JSON.stringify(data));
    }

    async function removeHandler(e) {
        e.preventDefault();

        const url = "http://localhost:5000/api/admin/section/" + courseId;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        sendAlert(JSON.stringify(data));
    }

    return (
        <>
            <div>
                <div className="form-container">
                    <form onSubmit={submitHandler} className="form-section">
                        <div>
                            <h1 className="Add-header">ADD SECTION</h1>
                        </div>
                        <div>
                            <label>Year: </label>
                            <select
                                type="number"
                                name="Year"
                                className="brd"
                                onChange={(e) => setYear(e.target.value)}
                                required
                            >
                                <option></option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>
                        <br />
                        <div>
                            <label>Semester: </label>
                            <select
                                type="text"
                                name="Year"
                                className="brd"
                                onChange={(e) => setSemester(e.target.value)}
                                required
                            >
                                <option></option>
                                <option value="Fall">Fall</option>
                                <option value="Winter">Winter</option>
                            </select>
                        </div>
                        <br />
                        <div>
                            <label>Instructor: </label>
                            <input
                                type="text"
                                name="instructor"
                                className="brd"
                                placeholder="Enter Instructor Name"
                                onChange={(e) => setInstructor(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label>Day: </label>
                            <select
                                type="text"
                                name="Weekdays"
                                className="brd"
                                onChange={(e) => setDay(e.target.value)}
                                required
                            >
                                <option></option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </div>
                        <br />
                        <div>
                            <label>Location: </label>
                            <input
                                type="text"
                                name="location"
                                className="brd"
                                placeholder="Enter Location "
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label>Course Name: </label>
                            <select
                                type="number"
                                name="courses"
                                className="brd"
                                onChange={(e) => setCourse(e.target.value)}
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
                        <br />
                        <div>
                            <label>Start Time: </label>
                            <select
                                type="number"
                                name="courses"
                                className="brd"
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            >
                                <option></option>
                                <option value="8">8 AM</option>
                                <option value="9">9 AM</option>
                                <option value="10">10 AM</option>
                                <option value="11">11 AM</option>
                                <option value="12">12 PM</option>
                                <option value="13">1 PM</option>
                                <option value="14">2 PM</option>
                                <option value="15">3 PM</option>
                                <option value="16">4 PM</option>
                                <option value="17">5 PM</option>
                                <option value="18">6 PM</option>
                                <option value="19">7 PM</option>
                            </select>
                        </div>
                        <br />
                        <div>
                            <label>End Time: </label>
                            <select
                                type="number"
                                name="courses"
                                className="brd"
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            >
                                <option></option>
                                <option value="8">8 AM</option>
                                <option value="9">9 AM</option>
                                <option value="10">10 AM</option>
                                <option value="11">11 AM</option>
                                <option value="12">12 PM</option>
                                <option value="13">1 PM</option>
                                <option value="14">2 PM</option>
                                <option value="15">3 PM</option>
                                <option value="16">4 PM</option>
                                <option value="17">5 PM</option>
                                <option value="18">6 PM</option>
                                <option value="19">7 PM</option>
                            </select>
                        </div>
                        <br />
                        <div>
                            <Button type="submit" colorScheme="blue">
                                Add
                            </Button>
                        </div>
                    </form>
                </div>
                <br></br>
                <br></br>
                <div className="remove-container">
                    <div>
                        <h1 className="Add-header">REMOVE SECTION</h1>
                    </div>
                    <form className="remove-section" onSubmit={removeHandler}>
                        <div>
                            <select
                                type="number"
                                name="courses"
                                className="brd"
                                onChange={(e) => setCourse(e.target.value)}
                                menuPortalTarget={document.body} 
                                menuPosition={'fixed'}
                                required
                            >
                                <option></option>
                                {show && fetchedData.map((course) => (<option value={course.course_id._id}>{course.course_id.course_Name}</option>))}
                            </select>
                        </div>
                        <div>
                            <Button type="submit" colorScheme="red">
                                Remove Section
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
