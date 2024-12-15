import axios from "axios";

const API_URL = "http://localhost:3000/api/user/upload";

export const uploadImage = async (formData) => {
  const response = await axios.post(`${API_URL}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
