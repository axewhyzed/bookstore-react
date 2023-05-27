import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { RoutePaths } from "./utils/enum";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path={RoutePaths.Home} element={<Home />} />
        <Route exact path={RoutePaths.Login} element={<Login />} />
        <Route exact path={RoutePaths.Register} element={<Register />} />
      </Routes>
    </>
  );
};

export default App;