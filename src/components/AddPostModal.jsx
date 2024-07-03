import React, { useState } from "react";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

const AddPostModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [usefulSurface, setUsefulSurface] = useState("");
  const [constructionYear, setConstructionYear] = useState("");
  const [type, setType] = useState("FOR_SALE");
  const [propertyType, setPropertyType] = useState("APARTMENT");
  const [photos, setPhotos] = useState([]);

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      description.trim() !== "" &&
      price.trim() !== "" &&
      numberOfRooms.trim() !== "" &&
      usefulSurface.trim() !== "" &&
      constructionYear.trim() !== "" &&
      photos.length > 0
    );
  };

  const handleSave = () => {
    const newPost = {
      title,
      description,
      price: parseFloat(price),
      numberOfRooms: parseInt(numberOfRooms, 10),
      usefulSurface: parseInt(usefulSurface, 10),
      constructionYear: parseInt(constructionYear, 10),
      type,
      propertyType,
    };
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(newPost)], { type: "application/json" })
    );
    photos.forEach((photo, index) => {
      formData.append("postPhotos", photo);
      console.log(photo);
    });

    fetch(`${API_URL}/api/users/${username}/posts`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      onSave();
  };

  const handlePhotoChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    const validPhotos = selectedFiles.filter((file) =>
      validImageTypes.includes(file.type)
    );

    if (validPhotos.length !== selectedFiles.length) {
      alert("Please upload only image files (jpg, png, gif).");
    }

    setPhotos(validPhotos);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-200 p-8 rounded-xl shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">
          Add a New Post
        </h2>
        <form className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Number of Rooms</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={numberOfRooms}
                onChange={(e) => setNumberOfRooms(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Useful Surface</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={usefulSurface}
                onChange={(e) => setUsefulSurface(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Construction Year</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={constructionYear}
                onChange={(e) => setConstructionYear(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="FOR_SALE">For Sale</option>
                <option value="FOR_LOAN">For Loan</option>
              </select>
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Property Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
              </select>
            </div>
            <div className="w-full px-2 mb-4">
              <label className="block text-gray-700">Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg"
              onClick={handleSave}
              disabled={!isFormValid()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
