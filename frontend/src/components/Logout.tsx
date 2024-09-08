import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { errorMessage } from "./UserAlert.ts";

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/`);
    } catch (error) {
      console.error("Logout failed", error);
      errorMessage();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white text-2xl py-4 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
