import {
    Avatar,
    Box,
    Center,
    Text,
    MenuItem,
    MenuList,
    Menu,
    MenuGroup,
    MenuButton,
    Button,
    MenuDivider,
    Card,
    CardHeader,
    Heading,
    CardBody,
    Stack,
    StackDivider,
    TagLeftIcon,
    Tag,
    TagLabel,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { useAlertContext } from "../context/AlertContext";
import { MdChatBubbleOutline, MdOutlineAttachMoney } from "react-icons/md";

export const Profile = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const { sendAlert } = useAlertContext();

    useEffect(() => {
        fetchProducts();
    }, []);

    let id = localStorage.getItem("id");

    const fetchProducts = async () => {
        const url = "http://localhost:5000/api/students/" + id;
        axios
            .get(url)
            .then((res) => {
                console.log("the profile name is" + res.data.student.name);
                setFetchedData(res.data.student.name);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    async function submitLogout(e) {
        e.preventDefault();
        sendAlert("Logout Successful", "success");
        setTimeout(() => {
            window.location.href = "/";
            localStorage.clear();
        }, 3000);
    }

    return (
        <Box>
            <Center marginY={5}>
                {/* <Avatar
                    name="Junhao Xue"
                    src="https://bgdanny.github.io/assets/image/me.jpg"
                /> */}
                <Menu>
                    <MenuButton as={Button}>
                        <CgProfile size={40} />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup>
                            <MenuItem onClick={submitLogout}>Log Out </MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
                <Text marginLeft={3}>{fetchedData}</Text>
            </Center>
            <Card>
                <CardHeader>
                    <Heading size={"md"}>Important Dates</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing="2">
                        <Tag bg="#EEF2FD">
                            <TagLeftIcon
                                as={MdChatBubbleOutline}
                                fill="#5E81F4"
                                fontSize={"xl"}
                            />
                            <TagLabel>
                                <Stack>
                                    <Heading size={"sm"}>
                                        Start of Semester
                                    </Heading>
                                    <Text>Tuesday, September 6, 2022</Text>
                                </Stack>
                            </TagLabel>
                        </Tag>
                        <Tag bg="#FFEFD6">
                            <TagLeftIcon
                                as={MdOutlineAttachMoney}
                                fill="#FFAE33"
                                fontSize={"xl"}
                            />
                            <TagLabel>
                                <Stack>
                                    <Heading size={"sm"}>
                                        Tuition Deadline
                                    </Heading>
                                    <Text>Friday, September 23, 2022</Text>
                                </Stack>
                            </TagLabel>
                        </Tag>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};
