import { useToast } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const AlertContext = createContext();

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const toast = useToast();
    const sendAlert = (title, status = "info") => {
        toast({ title, status, duration: 5000, isClosable: true });
    };
    return (
        <AlertContext.Provider value={{ sendAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
