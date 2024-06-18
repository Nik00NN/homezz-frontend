import React from "react";
import { FaUser } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";

const PostPage = () => {
  // Date mockate
  const post = {
    id: 1,
    creationDate: "2024-06-17",
    title: "Titlu",
    description: "Descriere",
    price: 2000,
    numberOfRooms: 2,
    usefulSurface: 200,
    constructionYear: 2000,
    type: "Sale",
    propertyType: "APARTMENT",
    photos: ["/public/house.png"],
    username: "MihaiAlexandruBirziloiu",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-800">
      <NavLink to="/all-posts">
        <IoArrowBackCircle
          size={50}
          className="absolute top-4 left-4 text-white hover:text-teal-400 cursor-pointer transform hover:scale-105 transition duration-300 focus:outline-none"
        />
      </NavLink>
      <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-screen-xl bg-gray-900 p-8 rounded-xl shadow-lg mt-8">
        <div className="flex flex-col items-start w-full md:w-3/5">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src="/public/no-profile-photo.png"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl text-teal-300 font-bold">
                {post.username}
              </h2>
              <p className="text-sm text-gray-400">{post.creationDate}</p>
            </div>
          </div>
          <h1 className="text-4xl text-teal-500 font-serif font-bold mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-white mb-4">{post.description}</p>
          <p className="text-lg text-white mb-2">Price: ${post.price}</p>
          <p className="text-lg text-white mb-2">Rooms: {post.numberOfRooms}</p>
          <p className="text-lg text-white mb-2">
            Surface: {post.usefulSurface} sqm
          </p>
          <p className="text-lg text-white mb-2">
            Year: {post.constructionYear}
          </p>
          <p className="text-lg text-white mb-2">Type: {post.type}</p>
          <p className="text-lg text-white mb-2">
            Property Type: {post.propertyType}
          </p>
        </div>
        <div className="w-1/3 bg-gray-900">
          <Carousel
            showThumbs={false}
            showIndicators={false}
            infiniteLoop={true}
          >
            {post.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
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
