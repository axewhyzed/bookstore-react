import React from "react";
import {NavLink, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import { RoutePaths } from "../utils/enum";

const MainNavigation = () => {
  return (
    <>
    <nav className="navbar">
      <NavLink to={RoutePaths.Login} className="navbar-link">Login</NavLink><br />
      <NavLink to={RoutePaths.Register} className="navbar-link">Register</NavLink>
      </nav>
        <Routes>
          <Route exact path={RoutePaths.Login} element={<Login />} />
          <Route exact path={RoutePaths.Register} element={<Register />} />
        </Routes>
    </>
  );
};

export default MainNavigation;
