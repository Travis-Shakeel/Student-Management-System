import React from "react";
import "./Discussions.css";
import { useAlertContext } from "../../context/AlertContext";
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

export const Discussions = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [fetchedSingleData, setFetchedSingleData] = useState([]);
    const [postShow, setPostShow] = useState(false);
    const [boardShow, setBoardShow] = useState(true);
    const [createShow, setCreateShow] = useState(false);
    const [show, setShow] = useState(false);
    const { sendAlert } = useAlertContext();
    let length;

    useEffect(() => {
        fetchProducts();
        fetchSingleProduct();
        const interval = setInterval(() => {
            fetchProducts();
            fetchSingleProduct();
        }, 1000)
        return()=>clearInterval(interval)
        fetchProducts();
    }, [boardShow, postShow]);

    let id = localStorage.getItem("id");

    const fetchProducts = async () => {
        const url = "http://localhost:5000/api/students/posts";
        axios.get(url).then((res) => {
            console.log(res.data);
            setFetchedData(res.data);



        })
            .catch((err) => {
                console.log(err);
            })
    };

    const fetchSingleProduct = async () => {
        console.log("LOOK2");
        const url2 = "http://localhost:5000/api/students/posts/" + localStorage.getItem('currentPostId').toString();
        axios.get(url2).then((res) => {
            console.log("LOOK", res.data);
            setFetchedSingleData(res.data);
            setShow(true);


        })
            .catch((err) => {
                console.log(err);
            })
    };

    const putReply = async (reply, id, currDate) => {
        const url = "http://localhost:5000/api/students/replyPosts/" + id;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": reply,
                "date": currDate
            }),
        });
        const data = await response.json();
        if (data) {
            sendAlert("reply added", "success");
        } else {
            sendAlert("reply failed", "error");
        }


    };

    const createPost = async (title, desc) => {
        const url = "http://localhost:5000/api/students/posts/";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_title: title,
                post_description: desc,
            }),
        });

        const data = await response.json();
        if (data) {
            sendAlert("post created", "success");
        } else {
            sendAlert("failed to post", "error");
        }
    };

    const handleClick = (event, title, id) => {
        event.preventDefault();
        localStorage.setItem('currentPostTitle', title);
        localStorage.setItem('currentPostId', id);
        fetchSingleProduct();
        setPostShow(true);
        setBoardShow(false);
    };

    const handleReply = (event, reply, id) => {
        event.preventDefault();



        if (reply) {
            const currDate = new Date().toISOString().slice(0, 10)
            document.getElementById('replyField').value = "";
            console.log(currDate)
            putReply(reply, id, currDate);

            setTimeout(() => fetchSingleProduct(), 300);

        }




        fetchProducts();
    };

    const handleCreateSubmit = (event, id) => {
        event.preventDefault();

        createPost(
            document.getElementById("titleField").value,
            document.getElementById("descField").value
        );

        setCreateShow(false);
        setBoardShow(true);

        fetchProducts();
    };

    function handleCreate(e) {
        e.preventDefault();
        setCreateShow(true);
        setBoardShow(false);
    }

    function handleBack() {
        setPostShow(false);
        setBoardShow(true);
        setCreateShow(false);
    }

    console.log("data: ", fetchedSingleData);
    /* Discussion Overview */
    return (
        <>
            {boardShow && <div>
                <Heading className="disc-heading" as='h3' size="md"  >Discussions</Heading>
                <div className="disc-title">
                    <h2>Topic</h2>
                </div>
                <section className="disc-topic-background">
                    <br />
                    <div className="display-posts">
                        {fetchedData.map((post, index) => (
                            <div key={index} className="display-post-wrapper" onClick={event => handleClick(event, post.post_title, post._id)} style={{ cursor: 'pointer' }}>

                                <div className="display-post-title">
                                    {post?.post_title}
                                </div>
                                <div className="display-post-description">
                                    {post?.post_description}
                                </div>

                            </div>
                        ))}
                    </div>
                </section>
                <button id="createButton" onClick={handleCreate}>Create</button>

            </div>}

            {show && postShow && <div className="wrapper">
                <Heading size="1xl">Discussions > {localStorage.getItem('currentPostTitle')}</Heading>
                <br></br>
                <h2 className="account-header">Post View</h2>
                <section className="disc-background">
                    <div className="post-background">
                        <h1 className="post-title">
                            {fetchedSingleData.post.post_title}
                        </h1>

                        <div className="post-description">
                            {fetchedSingleData.post.post_description}

                        </div>
                        <div id="replyBox">
                            <textarea type="text" placeholder="What's your reply..." id="replyField"></textarea>
                            <div className="button-box">
                                <button id="replyButton" onClick={event => handleReply(event, document.getElementById('replyField').value, fetchedSingleData.post._id)}>Reply</button>
                            </div>
                        </div>

                        {fetchedSingleData.post.replies.map((post, index) => (
                            <div key={index} className="post-single-post-bg">
                                <div className="post-single-post">
                                    <div className="post-user-date">{post?.date.slice(0, 10)}</div>
                                    <div className="post-user-replies">{post?.reply}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <button id="backButton" onClick={() => handleBack()}>Back</button>
            </div>}
            {createShow && <div>
                <Heading size="1xl">Discussion > Create</Heading>
                <br></br>
                <h2 className="account-header">Create Post</h2>
                <section className="disc-background">
                    <br />
                    <Table>
                        <Tbody className="display-posts">
                            <tr><Th>Title</Th></tr>
                            <Tr className="display-single-post-replybox">
                                <textarea type="text" placeholder="Enter title" id="titleField"></textarea>
                            </Tr>
                            <br />
                            <tr><Th>Description</Th></tr>
                            <Tr className="display-single-post-replybox">
                                <textarea type="text" placeholder="Describe your question..." id="descField"></textarea>
                            </Tr>
                            <br />
                            <Tr className="buttonsls">
                                <button id="createButton" onClick={handleCreateSubmit}>Post</button>
                                <button id="backButton" onClick={() => handleBack()}>Back</button>
                            </Tr>
                            <tr class="display-single-post-spacer" colspan="2"></tr>
                            
                        </Tbody>
                    </Table>
                </section>
                
            </div>}

        </>
    );
};
