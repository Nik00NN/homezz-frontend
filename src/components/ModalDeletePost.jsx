import React from "react";

const ModalDeletePost = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-gray-900 text-white rounded-lg shadow-lg max-w-lg p-8 transform transition-transform duration-400 ease-in-out">
        <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this post?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletePost;
