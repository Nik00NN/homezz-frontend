import { API_URL } from "../config.js";
import axios from "axios";

export const login = async (userName, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/authentication/login`, {
      username: userName,
      password: password,
    });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("tokenType", response.data.tokenType);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.status || "Login failed");
  }
};

export const register = async (
  userName,
  password,
  emailAddress,
  address,
  phoneNumber,
  file
) => {
  const data = new FormData();

  const json = {
    username: userName,
    password: password,
    emailAddress: emailAddress,
    address: address,
    phoneNumber: phoneNumber,
  };

  const jsonBlob = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  data.append("request", jsonBlob);

  if (!file) {
    const response = await fetch("/no-profile-photo.png");
    const defaultFileBlob = await response.blob();
    data.append("profilePhoto", defaultFileBlob, "no-profile-photo.png");
  } else {
    data.append("profilePhoto", file);
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/authentication/register`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
