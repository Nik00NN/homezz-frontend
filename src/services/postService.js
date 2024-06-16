import axios from "axios";
import { API_URL } from "../config";

export const getAllPosts = async (page = 0, size = 5) => {
  try {
    const response = await axios.get(`${API_URL}/api/posts`, {
      params: {
        page,
        size,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("GetAllPosts failed");
  }
};
