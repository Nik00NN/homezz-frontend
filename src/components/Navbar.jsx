import React, {useContext, useEffect, useState} from 'react';
import {AiOutlineClose, AiOutlineLogin, AiOutlineMenu} from 'react-icons/ai';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import MembershipModal from './MembershipModal';

const Navbar = ({username}) => {
    const [showNav, setShowNav] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {isAuthenticated} = useContext(AuthContext);

    const handleShowNav = () => {
        setShowNav(!showNav);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log(username);
    }, [username]);

    return (
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4">
            <h1 className="w-full text-4xl text-teal-500 font-bold m-4">
                Home<span className="text-teal-400">ZZ.ro</span>
            </h1>

            <div onClick={handleShowNav} className="block">
                {!showNav ? (
                    <AiOutlineClose size={25} className="text-teal-500 hover:cursor-pointer"/>
                ) : (
                    <AiOutlineMenu size={25} className="text-teal-500 hover:cursor-pointer"/>
                )}
            </div>
            <div
                className={
                    !showNav
                        ? 'fixed left-0 top-0 w-[30%] h-full border-r border-r-gray-900 bg-gray-700 ease-in-out duration-500'
                        : 'fixed left-[-100%]'
                }
            >
                <h1 className="w-full text-3xl text-teal-500 font-bold m-4">
                    Home<span className="text-teal-400">ZZ.ro</span>
                </h1>
                <ul className="p-4 uppercase">
                    <NavLink to="/" className="block mb-4">
                        <li className="p-4 border-b border-gray-500 text-gray-300 rounded-lg hover:bg-teal-600 hover:text-white transition duration-300">
                            Home
                        </li>
                    </NavLink>
                    <NavLink to="/apartments" className="block mb-4">
                        <li className="p-4 border-b border-gray-500 text-gray-300 rounded-lg hover:bg-teal-600 hover:text-white transition duration-300">
                            Apartments
                        </li>
                    </NavLink>
                    <NavLink className="block mb-4">
                        <li className="p-4 border-b border-gray-500 text-gray-300 rounded-lg hover:bg-teal-600 hover:text-white transition duration-300">
                            Houses
                        </li>
                    </NavLink>
                    <li
                        className="p-4 text-yellow-500 font-bold border-b border-gray-500 rounded-lg hover:bg-yellow-600 hover:text-white transition duration-300 hover:cursor-pointer"
                        onClick={handleOpenModal}
                    >
                        Buy Membership👑
                    </li>
                </ul>
                {isAuthenticated ? (
                    <div
                        className="absolute right-6 bottom-6 flex items-center p-4 bg-gray-800 text-teal-500 rounded-2xl shadow-2xl hover:bg-gray-900 hover:text-teal-300 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 hover:cursor-pointer">
                        <div className="relative">
                            <img
                                src="https://via.placeholder.com/50"
                                alt="Profile"
                                className="w-12 h-12 rounded-full mr-4 border-2 border-teal-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{username}</span>
                            <span className="text-sm text-teal-400">View Profile</span>
                        </div>
                    </div>

                ) : (
                    <NavLink to="/sign-in">
                        <div
                            className="absolute right-12 bottom-12 flex items-center space-x-2 text-lg text-teal-400 hover:text-teal-600 hover:cursor-pointer hover:underline transform hover:scale-105 transition duration-300">
                            <AiOutlineLogin size={28}/>
                            <span>Sign in</span>
                        </div>
                    </NavLink>
                )}
            </div>
            {isModalOpen && <MembershipModal onClose={handleCloseModal}/>}
        </div>
    );
};

export default Navbar;
