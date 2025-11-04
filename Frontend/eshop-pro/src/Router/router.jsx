import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Page/Home";
import ProductPage from "../Page/ProductPage";
import About from "../Page/About";
import CatagoriesPage from "../Page/CatagoriesPage";
import SignIn from "../Page/Auth/SignIn";
import LoginPage from "../Page/Auth/LoginPage";
import UserPage from "../Page/Auth/SignIn";
import BrandCenter from "../Page/BrandCenter";
import Blog from "../Page/Blog";
import AdminDashboard from "../Page/Admin/AdminDashboard";
import Categories from "../Components/Categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "catagories", element: <CatagoriesPage /> },
      { path: "about", element: <About /> },
      { path: "signup", element: <SignIn /> },
      { path: "login", element: <LoginPage /> },
      { path: "user", element: <UserPage /> },
      { path: "products/:id", element: <ProductPage/> },
      { path: "catagories", element: <Categories/> },
      {path: "brandcenter", element: <BrandCenter/>},
      {path: "blog", element: <Blog/>},
      {path: "adminDashboard", element:<AdminDashboard/> }
    ],
  },
]);
