import React from "react";
import { Stack, Heading, Button, Center } from "@chakra-ui/react";
import {
    MdOutlineSpaceDashboard,
    MdMenuBook,
    MdAttachMoney,
    MdChatBubbleOutline,
    MdSettings,
} from "react-icons/md";
import { BsCalculatorFill } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { usePageContext } from "../context/PageContext";

export const Nav = () => {
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
                variant={getButtonVariant(0)}
            >
                Dashboard
            </Button>
            <Button
                leftIcon={<MdMenuBook />}
                onClick={handleClick(1)}
                variant={getButtonVariant(1)}
            >
                View Grades
            </Button>
            <Button
                leftIcon={<MdMenuBook />}
                onClick={handleClick(2)}
                variant={getButtonVariant(2)}
            >
                Enroll Courses
            </Button>
            <Button
                leftIcon={<MdAttachMoney />}
                onClick={handleClick(3)}
                variant={getButtonVariant(3)}
            >
                Finance
            </Button>
            <Button
                leftIcon={<MdChatBubbleOutline />}
                onClick={handleClick(4)}
                variant={getButtonVariant(4)}
            >
                Discussions
            </Button>
            <Button
                leftIcon={<BsCalculatorFill />}
                onClick={handleClick(5)}
                variant={getButtonVariant(5)}
            >
                GPA Calculator
            </Button>
            <Button
                leftIcon={<MdSettings />}
                onClick={handleClick(6)}
                variant={getButtonVariant(6)}
            >
                Edit Account
            </Button>
            <Button
                leftIcon={<GrCircleInformation />}
                onClick={handleClick(7)}
                variant={getButtonVariant(7)}
            >
                User Information
            </Button>
        </Stack>
    );
};
