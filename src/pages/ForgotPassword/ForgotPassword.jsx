import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Email cannot be empty!");
      return;
    }
    // Aici adaugă logica pentru trimiterea cererii de resetare a parolei
    console.log("Password reset request sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-2xl w-full max-w-md bg-gray-900">
        <h2 className="text-4xl font-bold mb-6 text-center text-teal-600">
          Forgot Password
        </h2>
        <span className="text-gray-400 mb-">Enter your email below and we'll send it to you asap</span>
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
