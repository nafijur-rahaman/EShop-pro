import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Page/Home";
import ProductPage from "../Components/Productpage";
import Categories from "../Page/CategoriesPage";
import About from "../Page/About";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
        {path:"/", element:<Home></Home>},
        {path: "Product-details/:id",element:<ProductPage></ProductPage>},
        {path:"categories", element:<Categories/>},
        {path:"about", element:<About/>}
    ]
  },
]);