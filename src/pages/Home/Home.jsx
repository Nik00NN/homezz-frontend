import {faqs} from "./faq.js";
import Accordion from "../../components/Accordion.jsx";
import {NavLink} from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <nav className="flex items-center justify-evenly gap-16 w-full p-4">
                <img src="/public/logo4.png" alt="logo" className="w-1/12 mr-auto"/>
                <button className="text-white font-sans text-xl hover:underline hover:text-teal-200">For Sale</button>
                <button className="text-white font-sans text-xl hover:underline hover:text-teal-200">For Loan</button>

            </nav>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
                <div className="flex flex-col items-start justify-center flex-1 max-w-screen-xl px-6">
                    <div className="flex items-start justify-between w-full">
                        <h1 className="font-serif font-bold text-7xl text-white drop-shadow-md">
                            Buying and selling houses <br/> made <br/> <span
                            className="font-serif font-bold text-teal-300 animate-pulse duration-150">effortless.</span>
                        </h1>
                        <img src="/public/house.png" alt="Image Description" className=" w-1/4 self-start"/>
                    </div>
                    <p className=" text-lg text-white">
                        Discover a seamless and intuitive platform that simplifies the process of buying and selling
                        your home.
                    </p>
                    <p className="mt-4 text-lg text-white">
                        Experience the convenience of effortless transactions and professional support every step of the
                        way.
                    </p>
                    <NavLink to="/all-posts">
                        <button
                            className="rounded-e w-48 bg-teal-300 font-bold font-sans hover:bg-teal-400 focus:bg-teal-500 text-2xl mt-3 p-2 focus:animate-ping">Explore
                        </button>
                    </NavLink>
                </div>
            </div>
            <h1 className="text-teal-500 hover:text-teal-600 self-center ml-23 text-6xl font-sans">Get to know us
                better</h1>
            <div>
                <Accordion data={faqs}/>
            </div>
        </div>


    )
}

export default Home