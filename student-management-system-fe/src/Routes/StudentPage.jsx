import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Nav } from "../components/Nav";
import { Profile } from "../components/Profile";
import { PageContext } from "../context/PageContext";
import { Main } from "../components/Main";
import { createBreakpoint } from "react-use";
import { MobileMain } from "../components/MainPage/MobileMain";

const useBreakpoint = createBreakpoint({ desktop: 950, mobile: 700 });

function StudentPage() {
    const [page, setPage] = React.useState(0);
    const breakpoint = useBreakpoint();

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {breakpoint === "mobile" ? (
                <MobileMain />
            ) : (
                <Grid
                    gridTemplateColumns="20% 60% 20%"
                    gridTemplateRows="100vh"
                >
                    <GridItem>
                        <Nav />
                    </GridItem>
                    <GridItem bg="#F5F5FB">
                        <Main />
                    </GridItem>
                    <GridItem>
                        <Profile />
                    </GridItem>
                </Grid>
            )}
        </PageContext.Provider>
    );
}

export default StudentPage;
