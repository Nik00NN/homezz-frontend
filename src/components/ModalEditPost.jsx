import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { API_URL } from "../config";
import axios from "axios";

const ModalEditPost = ({ isOpen, onClose, onSave, postId }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postType, setPostType] = useState("");
  const [constructionYear, setConstructionYear] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [usefulSurface, setUsefulSurface] = useState(0);
  const [images, setImages] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [imagesAsFiles, setImagesAsFiles] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (isOpen && postId) {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(`${API_URL}/api/posts/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNumberOfRooms(response.data.numberOfRooms);
          setPostTitle(response.data.title);
          setPostDescription(response.data.description);
          setPostType(response.data.type);
          setConstructionYear(response.data.constructionYear);
          setUsefulSurface(response.data.usefulSurface);
          setPropertyType(response.data.propertyType);
          setPrice(response.data.price);
          setImages(response.data.photos);
          setInitialImages(response.data.photos);
        } catch (error) {
          console.error("Error fetching profile image", error);
        }
      }
    };
    fetchPost();
  }, [isOpen, postId]);

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImages((prevImages) => {
          const updatedImages = [...prevImages, reader.result];
          console.log("Updated images after adding:", updatedImages);
          return updatedImages;
        });
      };
      reader.readAsDataURL(file);
    }

    setImagesAsFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, file];
      console.log("Updated files after adding:", updatedFiles);
      return updatedFiles;
    });
  };

  const handleRemoveImage = (index) => {
    // Log starea curentă înainte de a face schimbări
    console.log("Current images:", images);
    console.log("Current imagesAsFiles:", imagesAsFiles);
    // Filtrează imaginile și fișierele
    const indexForFile = index - initialImages.length;

    const updatedImages = images.filter((img, i) => i !== index);
    const updatedImagesAsFiles = imagesAsFiles.filter(
      (file, i) => i !== indexForFile
    );

    // Log starea actualizată
    console.log("Updated images after removing:", updatedImages);
    console.log("Updated files after removing:", updatedImagesAsFiles);

    // Actualizează starea într-o manieră imutabilă
    setImages([...updatedImages]);
    setImagesAsFiles([...updatedImagesAsFiles]);
  };

  const handleSavePost = () => {
    onSave({
      title: postTitle,
      description: postDescription,
      type: postType,
      constructionYear,
      propertyType,
      price,
      numberOfRooms,
      usefulSurface,
      images,
    });
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="z-10 bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-white">
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">
            Edit Post
          </h2>

          <div className="flex flex-wrap space-x-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24 mb-4 mr-4">
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : `data:image/jpeg;base64,${image.fileContent}`
                  }
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                {typeof image === "string" ? (
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                  >
                    <FaTimes size={16} />
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
            <label
              htmlFor="imageInput"
              className="flex items-center justify-center w-24 h-24 bg-gray-700 cursor-pointer rounded-md mb-4 mr-4"
            >
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAddImage}
              />
              <span className="text-white">Add Image</span>
            </label>
          </div>

          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-gray-700 text-white p-2 rounded-md mb-3"
          />
          <textarea
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            placeholder="Description"
            className="w-full bg-gray-700 text-white p-2 rounded-md mb-3"
            rows={3}
          />
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md mb-3"
          >
            <option value="FOR_SELL">FOR SELL</option>
            <option value="FOR_LOAN">FOR LOAN</option>
          </select>
          <input
            type="number"
            value={constructionYear}
            onChange={(e) => setConstructionYear(e.target.value)}
            placeholder="Construction Year"
            className="w-full bg-gray-700 text-white p-2 rounded-md mb-3"
          />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md mb-3"
          >
            <option value="HOUSE">HOUSE</option>
            <option value="APARTMENT">APARTMENT</option>
          </select>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full bg-gray-700 text-white p-2 rounded-md mb-3"
          />
          <input
            type="number"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(e.target.value)}
            placeholder="Number of Rooms"
            className="w-full bg-gray-700 text-white p-2 rounded-md mb-3"
          />
          <input
            type="number"
            value={usefulSurface}
            onChange={(e) => setUsefulSurface(e.target.value)}
            placeholder="Useful Surface"
            className="w-full bg-gray-700 text-white p-2 rounded-md mb-3"
          />

          <button
            onClick={handleSavePost}
            className="mt-4 bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Save Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditPost;
