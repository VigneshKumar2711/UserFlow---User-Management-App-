import { Link } from "@tanstack/react-router";
import { TypeAnimation } from "react-type-animation";
import { FiUsers } from "react-icons/fi";

export default function Home() {
  return (
    <>
      
      <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-4 py-24">
        
        <div className="text-center space-y-6">
          
          
          <div className="flex items-center justify-center gap-3">
            <FiUsers className="text-4xl md:text-5xl text-white/90" />

            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-transparent bg-clip-text relative">
              UserFlow

              <span className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                UserFlow
              </span>
            </h1>
          </div>

          
          <TypeAnimation
            sequence={[
              "Smart Forms ✨",
              1500,
              "Smooth Flow ⚡",
              1500,
              "Better User Management 🚀",
              1500,
            ]}
            speed={50}
            repeat={Infinity}
            className="text-lg md:text-xl text-white/90 font-semibold"
          />

          
          <p className="text-center max-w-xl mx-auto text-white/90 font-bold leading-relaxed">
            Manage users efficiently with{" "}
            <span className="text-indigo-200 hover:text-white hover:underline">
              authentication
            </span>,{" "}
            <span className="text-indigo-200 hover:text-white hover:underline">
              CRUD
            </span>{" "}
            operations,{" "}
            <span className="text-indigo-200 hover:text-white hover:underline">
              search
            </span>,{" "}
            <span className="text-indigo-200 hover:text-white hover:underline">
              filtering
            </span>, and{" "}
            <span className="text-indigo-200 hover:text-white hover:underline">
              pagination
            </span>{" "}
            — all in one seamless experience.
          </p>

          
          <div className="flex gap-4 justify-center pt-2">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition shadow-md"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      
      <div className="w-full bg-gray-50 py-20 px-6 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">🔐 Authentication</h3>
            <p className="text-gray-600 text-sm">
              Secure login and registration system to control user access.
            </p>
          </div>

          
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">📋 CRUD Operations</h3>
            <p className="text-gray-600 text-sm">
              Easily create, update, delete, and manage user data.
            </p>
          </div>

          
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">🔍 Search & Filter</h3>
            <p className="text-gray-600 text-sm">
              Quickly find users with advanced search and filtering options.
            </p>
          </div>

          
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">📄 Pagination</h3>
            <p className="text-gray-600 text-sm">
              Navigate large datasets smoothly with efficient pagination.
            </p>
          </div>

          
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">⚡ Responsive UI</h3>
            <p className="text-gray-600 text-sm">
              Clean and modern interface optimized for all devices.
            </p>
          </div>

          
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">🚀 Fast Performance</h3>
            <p className="text-gray-600 text-sm">
              Optimized frontend ensures smooth and fast user experience.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}