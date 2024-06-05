import Home from "./pages/Home/Home.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Main from "./pages/Main/Main.jsx";
import {useContext} from "react";
import SignUp from "./pages/SignUp/SignUp.jsx";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/all-posts"/> : <SignIn/>}/>
                <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/all-posts"/> : <SignUp/>}/>
                <Route path="/all-posts" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
