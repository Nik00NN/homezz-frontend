const SignUp = () => {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Register</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-300">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-300">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phonenumber" className="block text-gray-300">Phone Number <span
                            className="text-sm font-thin text-gray-500">(+40)</span></label>
                        <input
                            type="text"
                            id="phonenumber"
                            name="phonenumber"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="profile-picture" className="block text-gray-300 ">Profile Picture <span
                            className="text-gray-500">(Optional)</span></label>
                        <input
                            type="file"
                            id="profile-picture"
                            name="profile-picture"
                            className="mt-1 block w-full text-gray-700 file:bg-teal-50 file:rounded-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-100 "
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-lg py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp