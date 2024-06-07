import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const MembershipModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-gray-800 text-white rounded-2xl shadow-2xl max-w-3xl mx-auto p-8 transform transition-transform duration-400 ease-in-out">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 focus:outline-none"
                >
                    <AiOutlineClose size={20} />
                </button>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-6 border-r border-gray-600">
                        <h2 className="text-3xl font-bold mb-4 text-teal-400">Normal User</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            <li className="mb-2">You can have only one post.</li>
                            <li className="mb-2">Limited number of downloads.</li>
                            <li className="mb-2">Ads displayed.</li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2 p-6">
                        <h2 className="text-3xl font-extrabold mb-4 text-yellow-500">Premium User</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            <li className="mb-2">Full access to content.</li>
                            <li className="mb-2">Unlimited downloads.</li>
                            <li className="mb-2">No ads.</li>
                            <li className="mb-2">Priority support.</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        className="px-6 py-3 font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition duration-300 focus:outline-none"
                        onClick={onClose}
                    >
                        Become Premium FOR ONLY
                        <span className="font-extrabold text-xl ml-2 text-white">$1.99</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembershipModal;
