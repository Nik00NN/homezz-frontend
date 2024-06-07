import Navbar from "../../components/Navbar.jsx";
import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

const Main = () => {
    let location = useLocation();
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const {isAuthenticated} = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated && location.state?.username) {
            setUsername(location.state.username);
        }
    }, [location, isAuthenticated]);

    return (
        isAuthenticated ? <Navbar username={username}/> : <Navbar/>
    );
}

export default Main;
