import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/authenticationService.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setErrorMessage("Username cannot be empty!");
      return;
    }
    if (!password) {
      setErrorMessage("Password cannot be empty!");
      return;
    }
    try {
      await login(username, password);
      setIsAuthenticated(true);
      navigate("/");
      localStorage.setItem("username", username);
    } catch (error) {
      setErrorMessage("Invalid Credentials.");
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-8 rounded-lg shadow-2xl w-full max-w-md bg-gray-900">
        <h2 className="text-4xl font-bold mb-6 text-center text-teal-600">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full p-2 border border-gray-300 outline-none rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full p-2 border border-gray-300 outline-none rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-sm font-thin text-red-500">{errorMessage}</p>
          <div className="flex items-center justify-between mb-6 gap-5">
            <NavLink to="/sign-up">
              <p className="text-sm text-gray-400 hover:underline hover:accent-gray-600 hover:cursor-pointer ">
                Don't have an account?
              </p>
            </NavLink>
          </div>
          <button
            type="submit"
            className="w-full text-lg py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 "
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-teal-600 cursor-pointer hover:underline focus:text-teal-700">
          Forgot password?
        </p>
      </div>
    </div>
  );
};

export default SignIn;
