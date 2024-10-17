import React from "react";
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
import { MdSearch } from "react-icons/md";
import axios from "axios";
import './ViewStudents.css';

export const ViewStudents = () => {
    const [fetchedData, setFetchedData] = useState([{}]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const url = "http://localhost:5000/api/students"
        axios.get(url).then((res) => {
            console.log(res.data);
            setFetchedData(res.data);
        })
            .catch((err) => {
                console.log(err);
            })
    };

    return <>
        <h1 className="view-student-title">Student Information</h1>

        <section className="view-student-background">
            <section className="view-student-grid">
                <div className="view-student-table">
                    <h3>Enrolled Students</h3>
                    <div>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Phone Number</Th>
                                    <Th>Address</Th>
                                </Tr>
                            </Thead>
                            {fetchedData.map((student) => (
                                <Tbody>
                                    <Tr>
                                        <Td>{student.name}</Td>
                                        <Td>{student.email}</Td>
                                        <Td>{student.phone_Number}</Td>
                                        <Td>{student.address}</Td>
                                    </Tr>
                                </Tbody>))}
                        </Table>
                    </div>
                </div>

            </section>
        </section>
    </>;
};
