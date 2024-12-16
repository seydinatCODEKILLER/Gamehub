import { useState } from "react";
import { uploadImage } from "../services/user";
import { useNavigate } from "react-router-dom";
import AuthStore from "@/zustand/store";
import { toast } from "react-toastify";

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setProfilePicture } = AuthStore((state) => state);

  const handleUploadImage = async (formData) => {
    setLoading(true);
    try {
      const response = await uploadImage(formData);
      const profilePictureUrl = response.user.avatar;
      setProfilePicture(profilePictureUrl);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message || "Une erreur s'est produite");
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleUploadImage, loading, error };
};

export default useUpload;
