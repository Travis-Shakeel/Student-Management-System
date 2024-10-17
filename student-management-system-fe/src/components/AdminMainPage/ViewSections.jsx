import React from "react";
import { useEffect, useState } from "react";

import "./ViewSections.css"
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
import { MdSearch } from "react-icons/md";
import axios from "axios";

export const ViewSections = () => {
    const [fetchedData, setFetchedData] = useState([{}]);
    const [show, setShow] = useState(false);

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

    return (
        <>
            <h1 className="view-student-title">Section Information</h1>
                 <section className="view-student-background">
            <section className="view-student-grid">
                <div className="view-student-table">
                <div>
                <Table variant="simple">
                <Thead>
                        <Tr>
                            <Th>Course</Th>
                            <Th>Instructor</Th>
                            <Th>Location</Th>
                            <Th>Time</Th>
                            <Th>Day</Th>
                        </Tr>
                    </Thead>
                    {show && fetchedData.map((section) => (
                        <Tbody>
                            <Tr>
                                <Td>
                                    {section.course_id.course_Name}:{" "}
                                    {section.course_id.course_Description}
                                </Td>
                                <Td>{section.instructor}</Td>
                                <Td>{section.location}</Td>
                                <Td>
                                    {section.start_time} - {section.end_time}
                                </Td>
                                <Td>{section.day}</Td>
                            </Tr>
                        </Tbody>
                    ))}
                </Table>
                </div>
                </div>
                </section>
                </section>
        </>
    );
};
