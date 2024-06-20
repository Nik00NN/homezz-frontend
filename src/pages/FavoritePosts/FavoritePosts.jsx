import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post.jsx";
import { API_URL } from "../../config.js";
import { NavLink } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

const FavoritePosts = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(
          `${API_URL}/api/users/${username}/favoritesPosts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavoritePosts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite posts:", error);
        setLoading(false);
      }
    };

    fetchFavoritePosts();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-800">
      <NavLink to="/all-posts">
        <IoArrowBackCircle
          size={50}
          className="absolute top-4 left-4 text-white hover:text-teal-400 cursor-pointer transform hover:scale-105 transition duration-300 focus:outline-none"
        />
      </NavLink>
      <div className="pt-24 max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-400 via-teal-600 to-teal-800 inline-block text-transparent bg-clip-text ml-1 mb-8">
          Favorite Posts
        </h1>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {favoritePosts.length === 0 ? (
              <p className="text-white">No favorite posts yet.</p>
            ) : (
              favoritePosts.map((post) => (
                <Post postId={post.id} key={post.id} {...post} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePosts;
