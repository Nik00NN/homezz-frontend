import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import Post from "../components/Post"; // Assuming Post component is in the same directory

const GeneralUserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    const fetchProfileImage = async () => {
      try {
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
    };

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
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchProfile();
    fetchProfileImage();
    fetchPosts();
  }, [username, token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-white flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-3xl">No Image</span>
            </div>
          )}
        </div>
        <h2 className="text-3xl font-bold">{user.username}</h2>
        <p className="text-xl">Email: {user.emailAddress}</p>
        <p className="text-xl">Phone: {user.phoneNumber}</p>
        <p className="text-xl">Address: {user.address}</p>
      </div>
      <div className="w-full max-w-screen-lg bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-teal-500 mb-4">
          User Posts
        </h3>
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                title={post.title}
                description={post.description}
                price={post.price}
                numberOfRooms={post.numberOfRooms}
                usefulSurface={post.usefulSurface}
                constructionYear={post.constructionYear}
                type={post.type}
                propertyType={post.propertyType}
                username={username}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default GeneralUserProfile;
