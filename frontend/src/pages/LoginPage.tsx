import React, { useState } from "react";
import { SignUp } from "../components/Login/Signup";
import Login from "../components/Login/Login";
import { useAuthContext } from "../providers/AuthProvider";
import Logout from "../components/Logout";

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { user } = useAuthContext();

  if (user) {
    return <Logout />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <button
            className={`py-2 px-4 rounded-t-lg ${
              !isRegistering ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsRegistering(false)}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 rounded-t-lg ${
              isRegistering ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsRegistering(true)}
          >
            Register
          </button>
        </div>

        {isRegistering ? <SignUp /> : <Login />}
      </div>
    </div>
  );
};

export default LoginPage;
