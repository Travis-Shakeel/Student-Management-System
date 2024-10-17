import React from "react";
import "./EnrollCourses.css";
import { useEffect, useState } from "react";
import {
    InputGroup,
    Input,
    InputLeftElement,
    Heading,
    Text,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import { useAlertContext } from "../../context/AlertContext";
export const EnrollCourses = () => {
    const [fetchedData, setFetchedData] = useState();
    const [courseName, setCourseName] = useState("");
    const [courseId, setCourseId] = useState();
    const [courseDesc, setCourseDesc] = useState();
    const [courseYear, setCourseYear] = useState();
    const [courseSem, setCourseSem] = useState();
    const [courseInst, setCourseInst] = useState();
    const [courseDay, setCourseday] = useState();
    const [courseStart, setCourseStart] = useState();
    const [courseEnd, setCourseEnd] = useState();
    const [location, setLocation] = useState();
    const {sendAlert} = useAlertContext();
    const [show, setShow] = useState(false);
    const [avail, setAvail] = useState(false);

    function showCourses(e) {
        e.preventDefault();
        setShow(true);
        fetchCourses();
    }

    useEffect(() => {
        if (courseName.length != 0) {
            fetchCourses();
        }
    }, []);

    const fetchCourses = async () => {
        const url = "http://localhost:5000/api/students/searchCourses/" + courseName;
        axios.get(url).then((res) => {
            console.log("The data is " + res.data);
            if (res.data != null) {
                setFetchedData(res.data);
                setCourseId(res.data._id);
                setCourseDesc(res.data.course_id.course_Description);
                setCourseYear(res.data.year);
                setCourseSem(res.data.semester);
                setCourseInst(res.data.instructor);
                setCourseday(res.data.day);
                setCourseStart(res.data.start_time);
                setCourseEnd(res.data.end_time);
                setLocation(res.data.location);
            }
            else {
                setAvail(true);
                setShow(false);
            }
        })
            .catch((err) => {
                console.log(err);
            })
    };

    async function handleEnroll(e) {
        e.preventDefault();
        let section = courseId;
        let id = localStorage.getItem('id');
        const url = 'http://localhost:5000/api/students/sections/' + id;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                section
            }),
        });

        const data = await response.json();
        if (data) {
            sendAlert("Course is enrolled successfully", "success");
        }
        else {
            sendAlert("Course is already Enrolled", "error");
        }
    }

    async function handleRemove(e) {
        e.preventDefault();
        let section = courseId;
        let id = localStorage.getItem('id');
        const url = 'http://localhost:5000/api/students/sections/' + id;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                section
            }),
        });
        const data = await response.json();
        if (data) {
            alert("Course is removed successfully");
        }
        else {
            alert("Course doesnot Exists");
        }
    }

    return <>
        <div>
            <h1 className="enroll-title">Enroll Courses</h1>
            <section className="enroll-bg">
                <div className="search-container">
                    <div className="search">
                        <InputGroup className="search-wrapper" >
                            <Input type="text" placeholder="Search" variant="filled" onChange={(e) => setCourseName(e.target.value)} />
                        </InputGroup>
                    </div>
                    <div class="bton">
                        <Button colorScheme='blue' onClick={showCourses} >Search</Button>
                    </div>

                </div>
            </section>
            <section className="enroll-search-bg">
                    <div className="enroll-title">Search Results:</div> 
                    {courseName.length > 0 && show &&
                        <div className="showCourse">
                            <div className="section1">
                                <div>Section ID:
                                    <p>{courseId}</p>
                                </div>
                                <div>Course Name:
                                    <p>{courseDesc}</p>
                                </div>
                                <div >Year :
                                    <p>{courseYear}</p>
                                </div>
                                <div >Semester:
                                    <p>{courseSem}</p>
                                </div>
                            </div>
                            <div className="section1">
                                <div>Instructor:
                                    <p>{courseInst}</p>
                                </div>
                                <div>Location:
                                    <p>{location}</p>
                                </div>
                                <div>Day:
                                    <p>{courseDay}</p>
                                </div>
                                <div>Start Time:
                                    <p>{courseStart}</p>
                                </div>
                                <div>End Time: 
                                    <p>{courseEnd}</p>
                                </div>
                            </div>
                        </div>}
                    {courseName.length > 0 && show &&
                        <div className="en-buttons">
                            <Button colorScheme='blue' onClick={handleEnroll}>Enroll</Button>
                        </div>}
                <div>
                    {avail && !show && <div>
                        <p className="not-available">The course section is not available</p></div>}
                </div>
            </section>
        </div>
    </>;

};
