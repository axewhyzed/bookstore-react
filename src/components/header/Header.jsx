import React from "react";
import { NavLink } from "react-router-dom";
import "./headerStyles.css";
import { RoutePaths } from "../../utils/enum";
import bookService from "../../services/book.service";
import { toast } from "react-toastify";

const Header = () => {
  const initialValues = {
    searchText: "",
  };

  const handleSearch = async (values) => {
    try {
      console.log("Submitted:", values);
      bookService.search(values).then((res) => {
        toast.success("Successfully Searched");
      });
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during the search
    }
  };
  return (
    <header className="header">
      <nav className="navbar">
        <NavLink to={RoutePaths.Home} className="navbar-link">
          Home
        </NavLink>
        <NavLink to={RoutePaths.Login} className="navbar-link">
          Login
        </NavLink>
        <NavLink to={RoutePaths.Register} className="navbar-link">
          Register
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;