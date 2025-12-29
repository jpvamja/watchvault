import MediaList from "./MediaList";
import { useAuth } from "../auth/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <MediaList />
    </div>
  );
};

export default Dashboard;
