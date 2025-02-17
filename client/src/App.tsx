import { Outlet } from "react-router-dom";
import "./App.css";
// import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
