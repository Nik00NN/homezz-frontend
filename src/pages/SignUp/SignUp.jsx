import { useState } from "react";
import { register } from "../../services/authenticationService";
import Toast from "../../components/Toast";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState();
  const [toastVisible, setToastVisible] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleProfilePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

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

    if (password.length < 8) {
      setErrorMessage("Password must have 8 characters minimum");
      return;
    }

    if (!confirmPassword) {
      setErrorMessage("Confirm Password cannot be empty!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords does not match!");
      return;
    }

    if (!emailAddress) {
      setErrorMessage("Email Address cannot be empty!");
      return;
    }

    if (!address) {
      setErrorMessage("Address cannot be empty!");
      return;
    }

    if (!phoneNumber) {
      setErrorMessage("Phone number cannot be empty!");
      return;
    }

    if (phoneNumber.length !== 10) {
      setErrorMessage("Phone number must have 10 digits");
      return;
    }

    try {
      await register(
        username,
        password,
        emailAddress,
        address,
        phoneNumber,
        file
      );
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setErrorMessage("");
      setIsRegistered(true);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
          Register
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
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmailAddress(e.target.value)}
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password"
              name="confirm-password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-300">
              Address
            </label>
            <input
              type="text"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phonenumber" className="block text-gray-300">
              Phone Number
              <span className="text-sm font-thin text-gray-500"> (+40) </span>
            </label>
            <input
              type="              text"
              id="phonenumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phonenumber"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="profile-picture" className="block text-gray-300">
              Profile Picture <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="file"
              id="profile-picture"
              name="profile-picture"
              onChange={handleProfilePhotoChange}
              className="mt-1 block w-full text-gray-700 file:bg-teal-50 file:rounded-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-100"
            />
          </div>
          <p className="text-sm font-thin text-red-500">{errorMessage}</p>
          {isRegistered ? (
            <NavLink to="/sign-in">
              <button className="w-full text-lg py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75">
                &larr; Go back to login
              </button>
            </NavLink>
          ) : (
            <button
              type="submit"
              className="w-full text-lg py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
            >
              Register
            </button>
          )}
        </form>
      </div>
      <Toast
        message="Registration successful!"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};

export default SignUp;
