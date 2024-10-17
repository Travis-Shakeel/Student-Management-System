import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { Stack, Center } from "@chakra-ui/react";
import {
    MdOutlineSpaceDashboard,
    MdMenuBook,
    MdAttachMoney,
    MdChatBubbleOutline,
    MdSettings,
} from "react-icons/md";
import { BsCalculatorFill } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { HiBookmark } from "react-icons/hi";
import { BiRegistered } from "react-icons/bi";
import { usePageContext } from "../context/PageContext";

export const AdminNav = () => {
    const { page, setPage } = usePageContext();

    const handleClick = (pageNumber) => () => {
        setPage(pageNumber);
    };

    const getButtonVariant = (pageNumber) => {
        if (pageNumber === page) {
            return "solid";
        }
        return "outline";
    };

    return (
        <Stack align="stretch" rowGap={3} paddingX={2}>
        <Center>
            <Heading as="h1" suze="3xl" marginTop={5} color="#5E81F4">
                SMS
            </Heading>
        </Center>
            <Button
                leftIcon={<MdOutlineSpaceDashboard />}
                onClick={handleClick(0)}
            >
                View Students
            </Button>
            <Button leftIcon={<MdOutlineSpaceDashboard />} onClick={handleClick(1)}>
                View Sections
            </Button>
            <Button leftIcon={<MdMenuBook />} onClick={handleClick(2)}>
                Add/Remove Sections
            </Button>
            <Button leftIcon={<BiRegistered />} onClick={handleClick(3)}>
                Register/Remove Students
            </Button>
            <Button leftIcon={<HiBookmark />} onClick={handleClick(4)}>
                Add Grades
            </Button>
        </Stack>
    );
};
