import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Email cannot be empty!");
      return;
    }

    const sendForgotPasswordRequest = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/api/users/forgot-password`,
          { email }
        );
        console.log("Token received:", response.data);
        setToken(response.data);
      } catch (error) {
        setErrorMessage(
          error.response
            ? error.response.data
            : "An error occurred. Please try again."
        );
      }
    };

    sendForgotPasswordRequest();
    console.log("Password reset request sent to:", email);
  };

  const handleChangePasswordClick = () => {
    navigate("/change-password", { state: { token, email } });
  };

  return token.length > 0 ? (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-2xl w-full max-w-md bg-gray-900">
        <h2 className="text-4xl font-bold mb-6 text-center text-teal-600">
          Check Your Email
        </h2>
        <p className="text-gray-400 mb-4">
          A token has been sent to your email. Please use it to change your
          password.
        </p>
        <button
          onClick={handleChangePasswordClick}
          className="w-full text-lg py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
        >
          Change Password
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-2xl w-full max-w-md bg-gray-900">
        <h2 className="text-4xl font-bold mb-6 text-center text-teal-600">
          Forgot Password
        </h2>
        <span className="text-gray-400 mb-">
          Enter your email below and we'll send you a token to change your
          password.
        </span>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <label htmlFor="email" className="block text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 outline-none rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-sm font-thin text-red-500">{errorMessage}</p>
          <button
            type="submit"
            className="w-full text-lg py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
