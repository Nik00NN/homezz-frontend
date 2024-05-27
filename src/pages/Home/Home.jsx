import {useEffect} from "react";
import {getAllUsers} from "../../services/userService.js";

const Home = () => {
    useEffect(() => {
        const data = async () => {
            const users = await getAllUsers();
            console.log(users)
            return users;
        }
        data()
    }, []);
    return (
        <>
        <nav className="">
            <img src="logo2.png" alt="logo" className="logo" />
            <div className="login-signup-container">
                <button>login</button>
                <button>signup</button>
            </div>
        </nav>
        <div className="title-container">
            <h1 className="title">
                 Buying and selling houses made effortless.
             </h1>
            <p className="subtitle">
                Discover your dream home or sell your property seamlessly with our expert guidance and personalized service.
            </p>
         </div>
        </>
    )
}

export default Home;