import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Page/Home";
import ProductPage from "../Components/ProductPage";
import Catagories from "../Page/CatagoriesPage";
import About from "../Page/About";
import CatagoriesPage from "../Page/CatagoriesPage";
import SignIn from "../Page/SignIn";
import LoginPage from "../Page/LoginPage";
import UserPage from "../Page/UserPage";
import BrandCenter from "../Page/BrandCenter";
import Blog from "../Page/Blog";

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
      { path: "Product-details/:id", element: <ProductPage></ProductPage> },
      { path: "catagories", element: <Catagories /> },
      {path: "brandcenter", element: <BrandCenter/>},
      {path: "blog", element: <Blog/>}
    ],
  },
]);
