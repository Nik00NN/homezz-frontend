import { faqs } from "./faq.js";
import Accordion from "../../components/Accordion.jsx";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const Home = () => {
  useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-800">
      <nav className="flex items-center justify-between w-full p-4 bg-gray-900 rounded-[3rem]">
        <div className="flex items-center">
          <img
            src="/public/logo4.png"
            alt="logo"
            className="w-[13%] shadow-lg"
          />
          <h1 className="ml-3 text-3xl text-teal-500 font-bold">
            Home<span className="text-teal-400">ZZ.ro</span>
          </h1>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        <div className="flex flex-col items-start justify-center flex-1 max-w-screen-xl px-6">
          <div className="flex items-start justify-between w-full">
            <h1 className="font-serif font-bold text-7xl text-white drop-shadow-md">
              Buying and selling houses <br /> made <br />{" "}
              <span className="font-serif font-bold text-teal-300 animate-pulse duration-150">
                effortless.
              </span>
            </h1>
            <img
              src="/public/house.png"
              alt="Image Description"
              className="w-1/4 self-start"
            />
          </div>
          <p className="text-lg text-white">
            Discover a seamless and intuitive platform that simplifies the
            process of buying and selling your home.
          </p>
          <p className="mt-4 text-lg text-white">
            Experience the convenience of effortless transactions and
            professional support every step of the way.
          </p>
          <NavLink to="/all-posts">
            <button className="rounded-e w-48 bg-teal-300 font-bold font-sans hover:bg-teal-400 focus:bg-teal-500 text-2xl mt-3 p-2 focus:animate-ping">
              Explore
            </button>
          </NavLink>
        </div>
      </div>

      <h1 className="text-teal-500 hover:text-teal-600 self-center ml-23 text-6xl font-sans">
        Get to know us better
      </h1>

      <div>
        <Accordion data={faqs} />
      </div>
    </div>
  );
};

export default Home;
