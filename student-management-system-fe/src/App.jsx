import Login from "./Routes/Login";
import AdminLogin from "./Routes/AdminLogin";
import AdminPage from "./Routes/AdminPage";
import StudentPage from "./Routes/StudentPage";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./Routes/Homepage";
import { AlertProvider } from "./context/AlertContext";

function App() {
    return (
        <ChakraProvider>
            <AlertProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/studentLogin" element={<Login />} />
                        <Route path="/adminLogin" element={<AdminLogin />} />
                        <Route path="/adminPage" element={<AdminPage />} />
                        <Route path="/studentPage" element={<StudentPage />} />
                    </Routes>
                </BrowserRouter>
            </AlertProvider>
        </ChakraProvider>
    );
}

export default App;
