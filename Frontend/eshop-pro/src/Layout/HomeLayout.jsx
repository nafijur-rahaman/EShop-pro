import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="grow pt-20">
      <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
