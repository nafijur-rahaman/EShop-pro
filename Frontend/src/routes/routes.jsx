
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Homepage from "../pages/Homepage";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import ProfilePage from "../pages/ProfilePage";
import Login from "../pages/Login";
import Register from "../pages/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>
      },{
        path: "/product-details",
        element:<ProductDetails></ProductDetails>
      },
      {
        path: "/profile-page",
        element: <ProfilePage></ProfilePage>
      },{
        path: "/login",
        element: <Login></Login>
      },{
        path: "/register",
        element: <Register></Register>
      }
    ],
  },
]);