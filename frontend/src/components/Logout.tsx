import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { errorMessage, logOutMessage } from "./UserAlert";

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      logOutMessage();
      navigate(`/`);
    } catch (error) {
      console.error("Logout failed", error);
      errorMessage();
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Logout
    </button>
  );
};

export default Logout;
