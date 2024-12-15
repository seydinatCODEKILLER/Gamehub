import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoutes from "./utils/privateRoutes";
import ProfilePicture from "./pages/ProfilePicture";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile-picture"
          element={
            <PrivateRoutes>
              <ProfilePicture />
            </PrivateRoutes>
          }
        />
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
  );
}

export default App;
