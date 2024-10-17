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

export const ViewGrades = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [show, setShow] = useState(false);
    let length;

    useEffect(() => {
        fetchProducts();
    }, []);

    let id = localStorage.getItem("id");

    const fetchProducts = async () => {
        const url = "http://localhost:5000/api/students/grades/" + id;
        axios
            .get(url)
            .then((res) => {
                setFetchedData(res.data);
                console.log("The data is " + res.data.length);
                if (res.data[0].letter_grade != null) {
                    setShow(true);
                }
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Heading size="lg">Grades Section</Heading>
            <Text color={"#5E81F4"} fontWeight="bold" marginY={3}>
                Grades
            </Text>
            <TableContainer borderRadius={25}>
                <Table variant="simple" >
                    <Thead bgColor={"#FFC670"}>
                        <Tr>
                            <Th>Course Code</Th>
                            <Th>Course Name</Th>
                            <Th>Course Credits</Th>
                            <Th>Grade</Th>
                        </Tr>
                    </Thead>
                    {show &&
                        fetchedData.map((grade) => (
                            <Tbody>
                                <Tr>
                                    <Td>{grade.course_id.course_Name}</Td>
                                    <Td>
                                        {grade.course_id.course_Description}
                                    </Td>
                                    <Td>{grade.course_id.credits}</Td>
                                    <Td>{grade.letter_grade}</Td>
                                </Tr>
                            </Tbody>
                        ))}
                </Table>
            </TableContainer>
        </>
    );
};
