import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { AdminNav } from "../components/AdminNav";
import { PageContext } from "../context/PageContext";
import { AdminMain } from "../components/AdminMain";
import { AdminProfile } from "../components/AdminProfile";
import { createBreakpoint } from "react-use";
import { AdminMobileMain } from "../components/AdminMainPage/AdminMobileMain";

const useBreakpoint = createBreakpoint({ desktop: 950, mobile: 700 });
function AdminPage() {
    const [page, setPage] = React.useState(0);
    const breakpoint = useBreakpoint();
    return (
        <PageContext.Provider value={{ page, setPage }}>
           {breakpoint === "mobile" ? (
                <AdminMobileMain />
            ) : (
                <Grid
                    gridTemplateColumns="20% 60% 20%"
                    gridTemplateRows="100vh"
                >
                <GridItem>
                    <AdminNav />
                </GridItem>
                <GridItem bg="#F5F5FB">
                    <AdminMain />
                </GridItem>
                <GridItem>
                    <AdminProfile />
                </GridItem>
            </Grid>
            )}
        </PageContext.Provider>
    );
}

export default AdminPage;
