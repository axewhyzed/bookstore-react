import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import { AuthWrapper } from "./context/auth.context";
import { CartWrapper } from "./context/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <CartWrapper>
          <Header />
          <ToastContainer />
          <App />
          <Footer />
        </CartWrapper>
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
