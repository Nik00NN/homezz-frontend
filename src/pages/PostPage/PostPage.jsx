import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { API_URL } from "../../config";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId, token]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-800">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-h-fit max-w-full bg-gray-800">
      <NavLink to="/all-posts">
        <IoArrowBackCircle
          size={50}
          className="absolute top-4 left-4 text-white hover:text-teal-400 cursor-pointer transform hover:scale-105 transition duration-300 focus:outline-none"
        />
      </NavLink>
      <div className="flex flex-col items-start w-full max-w-screen-xl bg-gray-900 p-8 rounded-xl shadow-lg mt-8">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden"></div>
        </div>
        <h1 className="text-5xl text-teal-500 font-serif font-bold mb-1">
          {post.title}
        </h1>
        <p className="text-sm text-gray-400 mb-5">
          Posted on: {post.creationDate[0]}/{post.creationDate[1]}/
          {post.creationDate[2]}
        </p>
        <p className="text-xl text-teal-300 font-bold mb-4 font-sans">
          {post.description}
        </p>
        <p className="text-xl text-teal-400 font-extrabold font-sans mb-2">
          Price:
          <span className="text-white font-medium text-lg"> {post.price}$</span>
        </p>
        <p className="text-xl text-teal-400 font-extrabold font-sans mb-2">
          Rooms:{" "}
          <span className="text-white font-medium text-lg">
            {post.numberOfRooms}
          </span>
        </p>
        <p className="text-xl text-teal-400 font-extrabold font-sans mb-2">
          Surface:{" "}
          <span className="text-white font-medium text-lg">
            {post.usefulSurface} sqm{" "}
          </span>
        </p>
        <p className="text-xl text-teal-400 font-extrabold font-sans mb-2">
          Year:{" "}
          <span className="text-white font-medium text-lg">
            {post.constructionYear}{" "}
          </span>
        </p>
        <p className="text-xl text-teal-400 font-extrabold font-sans mb-2">
          Type:{" "}
          <span className="text-white font-medium text-lg">
            {post.type.replace("_", " ")}{" "}
          </span>
        </p>
        <p className="text-xl text-teal-400 font-extrabold font-sans mb-2">
          Property Type:{" "}
          <span className="text-white font-medium text-lg">
            {post.propertyType}{" "}
          </span>
        </p>
        <div className="flex justify-center w-full mt-8">
          <Carousel showThumbs={false} infiniteLoop={true} width={1100}>
            {post.photos.map((photo, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${photo.fileContent}`}
                alt={`Photo ${index}`}
                className="object-cover h-full w-full"
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
