import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { NavLink, useLocation } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordToken, setPasswordToken] = useState("");
  const location = useLocation();
  const token = location.state?.token;
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Both password fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (passwordToken !== token) {
      setErrorMessage("Incorrect token!");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/api/users/change-password`, {
        email,
        newPassword,
      });
      console.log(response);
      setSuccessMessage("Password has been changed successfully!");
    } catch (error) {
      setErrorMessage(
        error.response
          ? error.response.data
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-2xl w-full max-w-md bg-gray-900">
        <h2 className="text-4xl font-bold mb-6 text-center text-teal-600">
          Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <label htmlFor="newPassword" className="block text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="mt-1 block w-full p-2 border border-gray-300 outline-none rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="confirmPassword" className="block text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full p-2 border border-gray-300 outline-none rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="token" className="block text-gray-300">
              Change Password Token
            </label>
            <input
              type="text"
              id="token"
              name="token"
              className="mt-1 block w-full p-2 border border-gray-300 outline-none rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) => setPasswordToken(e.target.value)}
            />
          </div>
          <p className="text-sm font-thin text-red-500">{errorMessage}</p>
          <p className="text-sm font-thin text-green-500">{successMessage}</p>
          {successMessage ? (
            <NavLink to="/sign-in">
              <button className="w-full text-lg py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75">
                &larr; Back to sign in
              </button>
            </NavLink>
          ) : (
            <button
              type="submit"
              className="w-full text-lg py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
            >
              Change Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
