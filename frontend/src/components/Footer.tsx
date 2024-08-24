import React, { useState } from "react";
import Swal from "sweetalert2";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      Swal.fire({
        title: "Thank you!",
        text: "We will be in touch as more recipes come out",
        icon: "success"
      });
      setMessage("Thank you for subscribing!");
      setEmail("");
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Recipe Sharing App (with React and Django)</h1>
        <form onSubmit={handleSubscribe} className="w-full max-w-md">
          <div className="flex flex-col md:flex-row md:items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to subscribe"
              className="text-black flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            <button
              type="submit"
              className="md:mt-0 md:ml-3 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </div>
          {message && <p className="mt-3 text-sm">{message}</p>}
        </form>
      </div>
    </footer>
  );
};
