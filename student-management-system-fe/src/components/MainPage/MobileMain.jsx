import React, { useEffect, useState } from "react";
import { Main } from "../Main";
import {
    IconButton,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { Nav } from "../Nav";
import { Profile } from "../Profile";
import { usePageContext } from "../../context/PageContext";

export const MobileMain = () => {
    const [isNavOpen, setNavOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const { page } = usePageContext();

    useEffect(() => {
        setNavOpen(false);
    }, [page]);

    return (
        <>
            <IconButton
                position={"absolute"}
                left={0}
                top={"50vh"}
                icon={<MdChevronRight />}
                onClick={() => setNavOpen(true)}
            />
            <IconButton
                position={"absolute"}
                right={0}
                top={"50vh"}
                icon={<MdChevronLeft />}
                onClick={() => setProfileOpen(true)}
            />
            <Main />
            <Drawer
                isOpen={isNavOpen}
                onClose={() => setNavOpen(false)}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <Nav />
                </DrawerContent>
            </Drawer>
            <Drawer
                isOpen={isProfileOpen}
                onClose={() => setProfileOpen(false)}
                placement="right"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <Profile />
                </DrawerContent>
            </Drawer>
        </>
    );
};
