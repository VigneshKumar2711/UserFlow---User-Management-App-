import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

type User = {
  name: string;
  email: string;
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700 -mt-1">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        
        <div className="flex flex-col items-start gap-3 text-left">
          <div className="flex items-center gap-2">
            <FiUsers className="text-3xl text-white/90" />
            <h2 className="font-bold text-xl">UserFlow</h2>
          </div>

          <p className="text-xs text-indigo-300 tracking-wide">
            Smart Forms • Smooth Flow 🚀
          </p>

          <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
            UserFlow helps you manage users easily with authentication, CRUD operations,
            search, filtering, and a smooth modern UI experience.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
  <h3 className="font-semibold text-sm text-gray-300">
    Quick Links
  </h3>

  <div className="flex flex-col items-center gap-2 text-sm">
    <Link to="/" className="hover:text-indigo-400 hover:underline transition">
      Home
    </Link>

    <Link to="/login" className="hover:text-indigo-400 hover:underline transition">
      Login
    </Link>

    <Link to="/register" className="hover:text-indigo-400 hover:underline transition">
      Register
    </Link>

    {currentUser && (
      <Link to="/users" className="hover:text-indigo-400 hover:underline transition">
        Users
      </Link>
    )}
  </div>
</div>

        
        <div className="flex flex-col items-start gap-3 text-left">
          <h3 className="font-semibold text-sm text-gray-300">
            Connect with me via
          </h3>

          <div className="flex gap-4 text-xl">
            <a
              href="https://github.com/VigneshKumar2711"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/d-vignesh-kumar-81342"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://wa.me/919515415228"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>

      
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-400">
        © {year} UserFlow. Built by Vignesh 🚀
      </div>

    </footer>
  );
}