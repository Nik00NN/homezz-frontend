import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { AiOutlinePlus } from "react-icons/ai";
import FilterSortBar from "../../components/FilterSortBar.jsx";
import { NavLink } from "react-router-dom";
import AddPostModal from "../../components/AddPostModal.jsx";
import { getAllPosts } from "../../services/postService.js";
import Post from "../../components/Post";

const Main = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const { isAuthenticated } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(5);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts(page, size);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, size]);

  const handleAddPost = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar username={username} />
      <div className="pt-24 max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-400 via-teal-600 to-teal-800 inline-block text-transparent bg-clip-text ml-1">
            Latest Posts
          </h1>
          {isAuthenticated ? (
            <button
              onClick={handleAddPost}
              className="flex items-center px-4 py-2 mt-2  font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition duration-300 focus:outline-none"
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add a new post
            </button>
          ) : (
            <NavLink to="/sign-in">
              <button className="flex items-center px-4 py-2 mt-2  font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition duration-300 focus:outline-none">
                <AiOutlinePlus size={20} className="mr-2" />
                Add a new post
              </button>
            </NavLink>
          )}
        </div>
        <FilterSortBar
          onSortChange={() => console.log("sort")}
          onFilterChange={() => console.log("filter")}
        />
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Post postId={post.id} key={post.id} {...post} />
            ))}
          </div>
        )}
        {posts.length > 0 ? (
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className={`px-4 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ${
                page === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={posts.length < size}
              className={`px-4 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ${
                posts.length < size ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <AddPostModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={() => console.log("onsave")}
      />
    </div>
  );
};

export default Main;
