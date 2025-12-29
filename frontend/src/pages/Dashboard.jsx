import MediaList from "./MediaList";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <MediaList />
    </div>
  );
};

export default Dashboard;
