import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";

type User = {
  name: string;
  email: string;
};

export default function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);


  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  
  useEffect(() => {
    const syncUser = () => {
      const user = localStorage.getItem("currentUser");
      setCurrentUser(user ? JSON.parse(user) : null);
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  
  useEffect(() => {
    if (!currentUser) return;

    fetch("http://localhost:5000/api/users") 
      .then(res => res.json())
      .then(data => {
        const exists = data.find((u: User) => u.email === currentUser.email);
        if (!exists) {
          localStorage.removeItem("currentUser");
          setCurrentUser(null);
          navigate({ to: "/login" });
        }
      })
      .catch(() => {});
  }, [currentUser])

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate({ to: "/login" });
  };

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-3 flex justify-between items-center">

      
      <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
        <FiUsers className="text-2xl" />
        UserFlow
      </Link>

      
      <div className="flex items-center gap-5 text-white/90 font-medium">

        <Link to="/" className="hover:text-white transition">
          Home
        </Link>

        {!currentUser ? (
          <>
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded text-white"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            
            <Link to="/users" className="hover:text-white transition">
              Users
            </Link>

            
            <span className="text-indigo-200 text-sm">
              Hi, {currentUser.name}
            </span>

            
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}