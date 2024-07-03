import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { AiOutlinePlus } from "react-icons/ai";
import FilterSortBar from "../../components/FilterSortBar.jsx";
import { NavLink, useNavigate } from "react-router-dom";
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
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({
    propertyType: "",
    numberOfRooms: "",
    usefulSurface: "",
    postType: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getAllPosts(page, size, filters);
        console.log(filters);
        setPosts(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, size, filters, isModalOpen]);

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

  const handleSortChange = (value) => {
    setSort(value);
    applySort(value);
  };

  const handleSaveAddedPost = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    if (newFilters.numberOfRooms !== "") {
      newFilters.numberOfRooms = parseInt(newFilters.numberOfRooms);
    }
    if (newFilters.usefulSurface !== "") {
      newFilters.usefulSurface = parseInt(newFilters.usefulSurface);
    }

    setFilters(newFilters);
  };

  const applySort = (sortValue) => {
    let sortedPosts = [...posts];

    if (sortValue === "price-asc") {
      sortedPosts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      sortedPosts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "year-asc") {
      sortedPosts.sort((a, b) => a.constructionYear - b.constructionYear);
    } else if (sortValue === "year-desc") {
      sortedPosts.sort((a, b) => b.constructionYear - a.constructionYear);
    }

    setPosts(sortedPosts);
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
              className="flex items-center px-4 py-2 mt-2 font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition duration-300 focus:outline-none"
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add a new post
            </button>
          ) : (
            <NavLink to="/sign-in">
              <button className="flex items-center px-4 py-2 mt-2 font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition duration-300 focus:outline-none">
                <AiOutlinePlus size={20} className="mr-2" />
                Add a new post
              </button>
            </NavLink>
          )}
        </div>
        <FilterSortBar
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                isAModalOpen={isModalOpen}
                {...post}
              />
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
        onSave={handleSaveAddedPost}
      />
    </div>
  );
};

export default Main;
