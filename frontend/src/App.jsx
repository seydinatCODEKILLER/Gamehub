import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import UploadProfile from "./pages/UploadProfile";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          {/* Bloque les routes publiques */}
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />

          {/* Route pour la photo de profil */}
          <Route path="/upload" element={<UploadProfile />} />

          {/* Dashboard ou page principale */}
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
