import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/auth";
import AuthStore from "@/zustand/store";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const login = AuthStore((state) => state.login);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      const { rest, token } = response;
      login(rest, token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export default useLogin;
