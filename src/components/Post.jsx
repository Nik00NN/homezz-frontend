import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCloseCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { API_URL } from "../config";

const truncateTitle = (title, wordLimit) => {
  const words = title.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return title;
};

const truncateDescription = (description, wordLimit) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const Post = ({
  postId,
  title,
  description,
  price,
  numberOfRooms,
  usefulSurface,
  constructionYear,
  type,
  propertyType,
  username,
}) => {
  const [images, setImages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${postId}/files`
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [postId]);

  useEffect(() => {
    const fetchIsFavorite = async () => {
      const token = localStorage.getItem("accessToken");
      const username = localStorage.getItem("username");
      const response = await axios.get(
        `${API_URL}/api/users/${username}/favoritePosts/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setIsFavorite(response.data);
    };
    fetchIsFavorite();
  }, []);

  const handleAddFavorite = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const currentUsername = localStorage.getItem("username");
      if (currentUsername === null) {
        return;
      }
      const response = await axios.post(
        `${API_URL}/api/users/${currentUsername}/add-favorite/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(username);
      setIsFavorite(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding favorite post:", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const currentUsername = localStorage.getItem("username");
      const response = await axios.delete(
        `${API_URL}/api/users/${currentUsername}/remove-favorite/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFavorite(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error removing post from favorites", error);
    }
  };

  return (
    <div className="flex bg-gray-900 shadow-xl rounded-2xl overflow-hidden m-4">
      <div className=" bg-gray-800 h-[100%] w-[100%]">
        <Carousel showThumbs={false} showIndicators={false} infiniteLoop={true}>
          {images.map((base64Image, index) => (
            <div key={index}>
              <img
                src={`data:image/jpeg;base64,${base64Image}`}
                alt={`Property ${index + 1}`}
                className="object-fill h-full w-full "
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-2/3 p-6">
        <h2 className="text-2xl font-bold text-teal-600">
          {truncateTitle(title, 3)}
        </h2>
        <p className="text-gray-300">{truncateDescription(description, 12)}</p>
        <div className="mt-4">
          <span className="block text-gray-400">
            Price:{" "}
            <span className="font-semibold text-gray-300">{price} EUR</span>
          </span>
          <span className="block text-gray-400">
            Rooms:{" "}
            <span className="font-semibold text-gray-300">{numberOfRooms}</span>
          </span>
          <span className="block text-gray-400">
            Surface:{" "}
            <span className="font-semibold text-gray-300">
              {usefulSurface} sqm
            </span>
          </span>
          <span className="block text-gray-400">
            Year:{" "}
            <span className="font-semibold text-gray-300">
              {constructionYear}
            </span>
          </span>
          <span className="block text-gray-400">
            Type:{" "}
            <span className="font-semibold text-gray-300">
              {type.replace("_", " ")}
            </span>
          </span>
          <span className="block text-gray-400">
            Property Type:{" "}
            <span className="font-semibold text-gray-300">{propertyType}</span>
          </span>
          <span className="block text-gray-400">
            Created By:{" "}
            {username === currentUsername ? (
              <span>{username}</span>
            ) : (
              <NavLink
                to={
                  currentUsername === null
                    ? "/sign-in"
                    : `${username}/view-profile`
                }
              >
                <span className="font-semibold text-gray-300 hover:underline hover:cursor-pointer hover:text-gray-400">
                  {username}
                </span>
              </NavLink>
            )}
          </span>
        </div>
        {isFavorite ? (
          <button
            onClick={handleRemoveFavorite}
            className={
              "mt-4 px-2 py-1 bg-transparent border border-gray-500 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-200 transition duration-300 "
            }
          >
            <AiOutlineCloseCircle size={20} className="mr-1" />
            Remove from favorites
          </button>
        ) : (
          <button
            onClick={handleAddFavorite}
            disabled={username === currentUsername}
            className="mt-4 px-2 py-1 bg-transparent border border-gray-500 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-200 transition duration-300 disabled:cursor-not-allowed"
          >
            <AiOutlineHeart size={20} className="mr-1" />
            Add to Favorites
          </button>
        )}
        <NavLink
          to={currentUsername === null ? "/sign-in" : `${postId}/view-post`}
          className="block mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 text-center"
        >
          View post <AiOutlineArrowRight className="inline-block ml-1" />
        </NavLink>
      </div>
    </div>
  );
};

export default Post;
