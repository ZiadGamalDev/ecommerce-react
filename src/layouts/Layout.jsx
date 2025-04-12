import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const LayOut = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />

      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false} 
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
    </React.Fragment>
  );
};

export default LayOut;
