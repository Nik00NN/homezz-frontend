import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Post from "../../components/Post";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (username) {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${API_URL}/api/users/${username}/files`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfileImage(`data:image/jpeg;base64,${response.data}`);
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };

    fetchProfileImage();
  }, [username]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${username}`);
        console.log(token);
        setUser(response.data);
        setEditableUser(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, [username]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/${username}/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("eroare: " + error);
      }
    };
    fetchPosts();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileImageClick = () => {
    console.log("Profile image clicked");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-800 p-6 flex flex-col items-center">
      <NavLink to="/all-posts">
        <IoArrowBackCircle
          size={50}
          className="absolute top-4 left-4 text-white hover:text-teal-400 cursor-pointer transform hover:scale-105 transition duration-300 focus:outline-none"
        />
      </NavLink>
      <div className="w-full max-w-screen-lg bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-6">
          <div className="relative flex-shrink-0 mb-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={128} className="text-teal-500" />
            )}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-80"
              onClick={handleProfileImageClick}
            >
              <FaEdit size={32} className="text-white" />
              <span className="text-white ml-2">Change</span>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              {isEditing ? (
                <input
                  type="text"
                  value={editableUser.username}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      username: e.target.value,
                    })
                  }
                  className="bg-gray-800 text-white p-2 rounded mt-2"
                />
              ) : (
                user.username
              )}
            </h2>
            <p className="text-white">
              Email Address:{" "}
              {isEditing ? (
                <input
                  type="email"
                  value={editableUser.emailAddress}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      emailAddress: e.target.value,
                    })
                  }
                  className="bg-gray-800 text-teal-400 p-2 rounded mt-2"
                />
              ) : (
                <span className="text-teal-400">{user.emailAddress}</span>
              )}
            </p>
            <p className="text-white">
              Phone Number:{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editableUser.phoneNumber}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="bg-gray-800 text-teal-400 p-2 rounded mt-2"
                />
              ) : (
                <span className="text-teal-400">{user.phoneNumber}</span>
              )}
            </p>
            <p className="text-white">
              Address:{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editableUser.address}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      address: e.target.value,
                    })
                  }
                  className="bg-gray-800 text-teal-400 p-2 rounded mt-2"
                />
              ) : (
                <span className="text-teal-400">{user.address}</span>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={handleEditClick}
          className="mb-6 rounded-lg bg-teal-300 font-bold hover:bg-teal-400 focus:bg-teal-500 text-xl p-2"
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
        <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-teal-500 mb-4">
            My Posts
          </h3>
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-700 p-4 rounded-lg shadow-md"
                >
                  <Post
                    postId={post.id}
                    title={post.title}
                    description={post.description}
                    type={post.type}
                    constructionYear={post.constructionYear}
                    propertyType={post.propertyType}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400">No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
