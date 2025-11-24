
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <div>Home Page</div>,
      },
    ],
  },
]);