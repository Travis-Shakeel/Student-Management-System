import React from "react";
import "./Finance.css";
import axios from "axios";
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
    Button,
} from "@chakra-ui/react";
import { useAlertContext } from "../../context/AlertContext";
export const Finance = () => {
    const [fetchedData, setFetchedData] = useState([{}]);
    const [fetchedStudentLoanData, setFetchedStudentLoanData] = useState([]);
    const [tutionFee, setTutionFee] = useState([{}]);
    const [fee, setFees] = useState(0);
    const [payShow, setPayShow] = useState(false);
    const [amountPaid, setAmounPaid] = useState(0);
    const { sendAlert } = useAlertContext();
    useEffect(() => {
        fetchProducts();
    }, []);

    let id = localStorage.getItem("id");

    const fetchProducts = async () => {
        const url = "http://localhost:5000/api/students/sections/" + id;
        axios
            .get(url)
            .then((res) => {
                setFetchedData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const url = "http://localhost:5000/api/students/" + id;
        axios
            .get(url)
            .then((res) => {
                setFetchedStudentLoanData(res.data.student.loan);
                setTutionFee(res.data.student.fees);
                setFees(res.data.student.currentFee);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function payButtonHandler(e) {
        e.preventDefault();
        setPayShow(true);
    }

    async function payHandler(e) {
        e.preventDefault();
        sendAlert("Paid", "success");
        const url = "http://localhost:5000/api/students/addReceipt/" + id;
        let fees = amountPaid;
        console.log("the amount paid is" + fees);
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fees,
            }),
        });

        let upfees = fee - fees;
        console.log("The up fees is " + upfees);
        const url2 = "http://localhost:5000/api/students/fees/" + id;
        const response2 = await fetch(url2, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                upfees,
            }),
        });
        update();
        setPayShow(false);
    }

    async function update() {
        const url3 = "http://localhost:5000/api/students/" + id;
        const response3 = await fetch(url3, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response3.json();
        setTutionFee(data.student.fees);
        setFees(data.student.currentFee);
    }

    return (
        <>
            {!payShow && (
                <div className="display-tution">
                    <h2 className="account-header">Account Summary</h2>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Year</Th>
                                    <Th>Term</Th>
                                    <Th>Type</Th>
                                    <Th>Amount Due</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>2022</Td>
                                    <Td>Fall/Winter</Td>
                                    <Td>Academic</Td>
                                    <Td>$ {fee}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            {!payShow && (
                <div className="pay-button">
                    <Button colorScheme="blue" onClick={payButtonHandler}>
                        Pay Now
                    </Button>
                </div>
            )}
            {!payShow && (
                <div className="display-loan">
                    <h2 className="account-header">Government Student Loan</h2>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Year</Th>
                                    <Th>Lender</Th>
                                    <Th>Start</Th>
                                    <Th>End</Th>
                                </Tr>
                            </Thead>
                            {fetchedStudentLoanData.map((loan) => (
                                <Tbody>
                                    <Tr>
                                        <Td>{loan.year}</Td>
                                        <Td>ALberta Student Loan</Td>
                                        <Td>{loan.start_Date}</Td>
                                        <Td>{loan.end_Date}</Td>
                                    </Tr>
                                </Tbody>
                            ))}
                        </Table>
                    </TableContainer>
                </div>
            )}
            {!payShow && (
                <div className="display-payment">
                    <h2 className="payment-header">Past Payment History</h2>
                    <TableContainer>
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    {/* <Th>Year</Th> */}
                                    <Th>Payment</Th>
                                    <Th>Date</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tutionFee.map((fee) => (
                                    <Tr>
                                        <Td>$ {fee.tution_Fee}</Td>
                                        <Td>{fee.date_of_Receipt}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {payShow && (
                <div className="form-card-container">
                    <div>
                        <div>
                            <h1 className="pay-header">Payment Information</h1>
                        </div>
                        <form className="form-card" onSubmit={payHandler}>
                            <div className="div-gap">
                                <input
                                    type="number"
                                    name="Amount"
                                    placeholder="Enter Amount"
                                    onChange={(e) =>
                                        setAmounPaid(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="div-gap">
                                <input
                                    type="text"
                                    name="CardNumber"
                                    placeholder="Enter Card No"
                                    required
                                />
                            </div>
                            <div className="div-gap">
                                <input
                                    type="text"
                                    name="CardName"
                                    placeholder="Enter CardHolder's Name"
                                    required
                                />
                            </div>
                            <div className="expiry-cvv div-gap">
                                <div>
                                    <select
                                        name="expireMM"
                                        id="expireMM"
                                        required
                                    >
                                        <option value="">Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    <select
                                        name="expireYY"
                                        id="expireYY"
                                        required
                                    >
                                        <option value="">Year</option>
                                        <option value="20">2020</option>
                                        <option value="21">2021</option>
                                        <option value="22">2022</option>
                                        <option value="23">2023</option>
                                        <option value="24">2024</option>
                                    </select>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="cvv"
                                        size="2"
                                        placeholder="CVV"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="div-gap">
                                <Button type="submit" colorScheme="blue">
                                    Pay
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
