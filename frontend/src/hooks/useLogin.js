import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/auth";
import AuthStore from "@/zustand/store";
import { toast } from "react-toastify";
import useNotificationStore from "@/zustand/notifications";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const login = AuthStore((state) => state.login);
  const { setMessage } = useNotificationStore((state) => state);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      const { rest, token } = response;
      login(rest, token);
      setMessage("Connexion réussie !");
      navigate("/");
    } catch (err) {
      setError(err.response.data.message || "Identifiants incorrects");
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export default useLogin;
