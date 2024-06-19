import axios from "axios";
import { API_URL } from "../config";

export const getAllPosts = async (page, size, filters) => {
  try {
    const params = {
      page,
      size,
      ...filters,
    };
    const response = await axios.get(`${API_URL}/api/posts`, { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
