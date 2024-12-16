import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";
import authStore from "../zustand/store";
import { toast } from "react-toastify";

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
      navigate("/upload", {
        state: { successMessageConnexion: "Inscription réussie !" },
      });
    } catch (error) {
      setError(error.response.data.message || "Une erreur s'est produite");
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleRegister, loading, error };
};

export default useRegister;
