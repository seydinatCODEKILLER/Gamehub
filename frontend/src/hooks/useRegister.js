import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";
import authStore from "../zustand/store";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const login = authStore((state) => state.login);

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
      const { newUser, token } = response;
      login(newUser, token);
      navigate("/upload");
    } catch (error) {
      setError(error.response?.data?.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };
  return { handleRegister, loading, error };
};

export default useRegister;
