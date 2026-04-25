import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  redirect, 
} from "@tanstack/react-router";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Navbar from "../components/Navbar"; 
import Footer from "../pages/Footer";


const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Navbar />
      <Outlet />
            <Footer /> 

    </div>
  ),
});


const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});


const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});


const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",

  beforeLoad: () => {
    const user = localStorage.getItem("currentUser");

    if (!user) {
      throw redirect({ to: "/login" });
    }
  },

  component: Users,
});


const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  usersRoute,
]);

export const router = createRouter({
  routeTree,
});