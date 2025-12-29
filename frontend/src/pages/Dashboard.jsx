import MediaList from "./MediaList";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </button>
      <MediaList />
    </div>
  );
};

export default Dashboard;
