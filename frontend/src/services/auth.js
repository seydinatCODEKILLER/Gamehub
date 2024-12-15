import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/sign_up`, userData);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/sign_in`, data);
  return response.data;
};
