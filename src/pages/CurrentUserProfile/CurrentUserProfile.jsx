import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Post from "../../components/Post";
import { Oval } from "react-loader-spinner";
import ModalDeletePost from "../../components/ModalDeletePost";
import { AiOutlineEdit } from "react-icons/ai";
import ModalEditPost from "../../components/ModalEditPost";

const CurrentUserProfile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [idPostToDelete, setIdPostToDelete] = useState(null);
  const [idPostToEdit, setIdPostToEdit] = useState(null);
  const [errors, setErrors] = useState({});
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (username) {
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
      }
    };

    fetchProfileImage();
  }, [username, token]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${username}`);
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
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, [username, token]);

  const validateFields = () => {
    const newErrors = {};
    if (!editableUser.emailAddress) {
      newErrors.emailAddress = "Email address cannot be empty.";
    }
    if (!editableUser.phoneNumber) {
      newErrors.phoneNumber = "Phone number cannot be empty.";
    } else if (editableUser.phoneNumber.length > 10) {
      newErrors.phoneNumber = "Phone number cannot be more than 10 digits.";
    } else if (editableUser.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number cannot contain less than 10 digits";
    }
    if (!editableUser.address) {
      newErrors.address = "Address cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = async () => {
    if (isEditing) {
      if (validateFields()) {
        try {
          await axios.put(
            `${API_URL}/api/users/${username}/edit-profile`,
            {
              emailAddress: editableUser.emailAddress,
              phoneNumber: editableUser.phoneNumber,
              address: editableUser.address,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(editableUser);
          setIsEditing(false);
        } catch (error) {
          console.error("Error updating profile", error);
        }
      } else {
        return;
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleEditPostClick = (postId) => {
    setIdPostToEdit(postId);
  };

  const handleCloseEditPostModal = () => {
    setIdPostToEdit(null);
  };

  const handleProfileImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleDeletePost = (postId) => {
    setIdPostToDelete(postId);
  };

  const handleCloseDeletePostModal = () => {
    setIdPostToDelete(null);
  };

  const handleConfirmDeletePost = async () => {
    try {
      await axios.delete(`${API_URL}/api/users/posts/${idPostToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== idPostToDelete));
      setIdPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePhoto", file);

      try {
        const response = await axios.put(
          `${API_URL}/api/users/${username}/change-profilePhoto`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        console.log(user);
        if (response.status === 200) {
          console.log(response.data);
          setProfileImage(`data:image/jpeg;base64,${response.data}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  if (!user) {
    return (
      <div>
        <Oval color="#00BFFF" height={80} width={80} />
      </div>
    );
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
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{user.username}</h2>
            <p className="text-white">
              Email Address:{" "}
              {isEditing ? (
                <div>
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
                  {errors.emailAddress && (
                    <p className="text-red-500 text-sm">
                      {errors.emailAddress}
                    </p>
                  )}
                </div>
              ) : (
                <span className="text-teal-400">{user.emailAddress}</span>
              )}
            </p>
            <p className="text-white">
              Phone Number:{" "}
              {isEditing ? (
                <div>
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
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>
              ) : (
                <span className="text-teal-400">{user.phoneNumber}</span>
              )}
            </p>
            <p className="text-white">
              Address:{" "}
              {isEditing ? (
                <div>
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
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
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
            My Posts {`(${posts.length} / 5)`}
          </h3>
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-700 p-4 rounded-lg shadow-md relative"
                >
                  {idPostToEdit !== null ? (
                    ""
                  ) : (
                    <>
                      {" "}
                      <button
                        onClick={() => handleEditPostClick(post.id)}
                        className="absolute top-10 right-20 bg-green-600 text-white pb-1 pt-1 pl-2 pr-2 rounded-md "
                      >
                        <AiOutlineEdit size={28}></AiOutlineEdit>
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="absolute top-10 right-10 bg-red-800 text-white pb-1 pl-3 pr-3 rounded-md text-2xl"
                      >
                        X
                      </button>
                    </>
                  )}

                  <Post
                    postId={post.id}
                    title={post.title}
                    description={post.description}
                    type={post.type}
                    constructionYear={post.constructionYear}
                    propertyType={post.propertyType}
                    price={post.price}
                    numberOfRooms={post.numberOfRooms}
                    usefulSurface={post.usefulSurface}
                    username={username}
                    isAModalOpen={idPostToEdit !== null}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400">No posts available</p>
            )}
          </div>
        </div>
      </div>
      <ModalDeletePost
        isOpen={idPostToDelete !== null}
        onClose={handleCloseDeletePostModal}
        onDelete={handleConfirmDeletePost}
      />
      <ModalEditPost
        isOpen={idPostToEdit !== null}
        postId={idPostToEdit}
        onClose={handleCloseEditPostModal}
      />
    </div>
  );
};

export default CurrentUserProfile;
