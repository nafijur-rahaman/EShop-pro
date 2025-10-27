import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Page/Home";
import About from "../Page/About";
import CatagoriesPage from "../Page/CatagoriesPage";
import SignIn from "../Page/SignIn";
import LoginPage from "../Page/LoginPage"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
        {path:"/", element:<Home></Home>},
        {path:"catagories", element:<CatagoriesPage/>},
        {path:"about", element:<About/>},
        {path:"signin", element:<SignIn/>},
        {path:"login", element:<LoginPage/>},
    ]
  },
]);