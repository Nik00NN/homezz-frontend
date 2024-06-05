import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";

const Navbar = () => {
    const [showNav, setShowNav] = useState(true);
    const {isAuthenticated} = useContext(AuthContext)

    const handleShowNav = () => {
        setShowNav(!showNav)
    }

    return (
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 ">
            <h1 className="w-full text-4xl text-teal-500 font-bold m-4">Home<span className="text-teal-400">ZZ.ro</span>
            </h1>

            <div onClick={handleShowNav} className="block ">
                {!showNav ? <AiOutlineClose size={25} className="text-teal-500 hover:cursor-pointer"/> :
                    <AiOutlineMenu size={25} className="text-teal-500 hover:cursor-pointer "/>}
            </div>
            <div
                className={!showNav ? 'fixed left-0 top-0 w-[30%] h-full border-r border-r-gray-900 bg-gray-700 ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <h1 className="w-full text-3xl text-teal-500 font-bold m-4">Home<span
                    className="text-teal-400">ZZ.ro</span></h1>
                <ul className="p-4 uppercase">
                    <NavLink to="/">
                        <li className="p-4 border-b border-gray-500 text-gray-300 hover:underline hover:cursor-pointer hover:text-gray-400">Home</li>
                    </NavLink>
                    <li className="p-4 border-b border-gray-500 text-gray-300 hover:underline hover:cursor-pointer hover:text-gray-400">Apartments</li>
                    <li className="p-4 border-b border-gray-500 text-gray-300 hover:underline hover:cursor-pointer hover:text-gray-400">Houses</li>
                    <li className="p-4 text-yellow-500 font-bold border-b border-gray-500 hover:underline hover:cursor-pointer hover:text-yellow-400">Buy
                        Membership👑
                    </li>
                </ul>
                {isAuthenticated ?
                    <div className="text-lg absolute right-12 bottom-12 text-teal-400 hover:text-teal-600
                    hover:cursor-pointer hover:underline">Profilul
                        userului conectat
                    </div> :
                    <NavLink to="/sign-in">
                        <div
                            className="text-lg absolute right-12 bottom-12 text-teal-400 hover:text-teal-600 hover:cursor-pointer hover:underline">Sign
                            in
                        </div>
                    </NavLink>}
            </div>
        </div>
    )
}

export default Navbar;