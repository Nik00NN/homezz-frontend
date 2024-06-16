import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const MembershipModal = ({ onClose }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-gray-800 text-white rounded-2xl shadow-2xl max-w-3xl mx-auto p-8 transform transition-transform duration-400 ease-in-out">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 focus:outline-none"
        >
          <AiOutlineClose size={20} />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 border-r border-gray-600">
            <h2 className="text-3xl font-bold mb-4 text-teal-400">
              Normal User
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li className="mb-2">You can create only one post.</li>
              <li className="mb-2">Limited number of downloads per month.</li>
              <li className="mb-2">Free access to basic features.</li>
              <li className="mb-2">Ads displayed in the app.</li>
              <li className="mb-2">Access to standard support.</li>
              <li className="mb-2">View only a portion of the content.</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-3xl font-extrabold mb-4 text-yellow-500">
              Premium User
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li className="mb-2">
                You can create an unlimited number of posts.
              </li>
              <li className="mb-2">Unlimited downloads.</li>
              <li className="mb-2">Enjoy an ad-free experience.</li>
              <li className="mb-2">Access to 24/7 priority support.</li>
              <li className="mb-2">
                Access to all features and content of the app.
              </li>
              <li className="mb-2">
                Receive updates and exclusive content before normal users.
              </li>
              <li className="mb-2">
                Advanced options for profile and post customization.
              </li>
              <li className="mb-2">
                Access detailed reports and analytics on post performance.
              </li>
              <li className="mb-2">
                Priority access to events and webinars organized by the
                platform.
              </li>
              <li className="mb-2">Automatic backup of data and posts.</li>
            </ul>
          </div>
        </div>
        {isAuthenticated ? (
          <NavLink to="/buy-membership">
            <div className="flex justify-center mt-6">
              <button
                disabled
                className="px-6 py-3 font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition duration-300 focus:outline-none"
                onClick={onClose}
              >
                Become Premium FOR ONLY
                <span className="font-extrabold text-xl ml-2 text-white">
                  $1.99/MONTH
                </span>
              </button>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/sign-in">
            <div className="flex justify-center mt-6">
              <button
                disabled
                className="px-6 py-3 font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition duration-300 focus:outline-none"
                onClick={onClose}
              >
                Become Premium FOR ONLY
                <span className="font-extrabold text-xl ml-2 text-white">
                  $1.99/MONTH
                </span>
              </button>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default MembershipModal;
