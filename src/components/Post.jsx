import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
}) => {
  const [images, setImages] = useState([]);

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

  return (
    <div className="flex bg-gray-900 shadow-xl rounded-2xl overflow-hidden m-4">
      <div className="w-1/3 bg-gray-300">
        <Carousel
          dynamicHeight={true}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
        >
          {images.map((base64Image, index) => (
            <div key={index}>
              <img
                src={`data:image/jpeg;base64,${base64Image}`}
                alt={`Property ${index + 1}`}
                className="object-cover h-full w-full"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-2/3 p-6">
        <h2 className="text-3xl font-bold text-teal-600">
          {truncateTitle(title, 6)}
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
        </div>
        <button className="mt-4 px-2 py-1 bg-transparent border border-gray-500 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-200 transition duration-300">
          <AiOutlineHeart size={20} className="mr-1" />
          Add to Favorites
        </button>
        <NavLink
          to={`/`}
          className="block mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 text-center"
        >
          View Details <AiOutlineArrowRight className="inline-block ml-1" />
        </NavLink>
      </div>
    </div>
  );
};

export default Post;
