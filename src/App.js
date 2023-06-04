import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import User from "./pages/user/User";
import EditUser from "./pages/user/editUser/EditUser";
import Category from "./pages/category/Category";
import EditCategory from "./pages/category/editCategory/EditCategory";
import { RoutePaths } from "./utils/enum";
import Home from "./pages/home/Home";
import EditBook from "./pages/book/editBook/EditBook";
import { useAuthContext } from "./context/auth.context";
import Book from "./pages/book/Book";
import UpdateProfile from "./pages/update-profile/UpdateProfile";

const App = () => {
  const authContext = useAuthContext();

  const Redirect = <Navigate to={RoutePaths.Login} />;
  return (
    <>
      <Routes>
        <Route exact path={RoutePaths.Login} element={<Login />} />
        <Route exact path={RoutePaths.Register} element={<Register />} />
        <Route
          exact
          path={RoutePaths.Home}
          element={authContext.user.id ? <Home /> : Redirect}
        />

        <Route
          exact
          path={RoutePaths.User}
          element={authContext.user.id ? <User /> : Redirect}
        />

        <Route
          exact
          path={RoutePaths.EditUser}
          element={authContext.user.id ? <EditUser /> : Redirect}
        />

        <Route
          exact
          path={RoutePaths.Book}
          element={authContext.user.id ? <Book /> : Redirect}
        />

        <Route
          exact
          path={RoutePaths.EditBook}
          element={authContext.user.id ? <EditBook /> : Redirect}
        />

        <Route
          exact
          path={RoutePaths.Category}
          element={authContext.user.id ? <Category /> : Redirect}
        />

        <Route
          exact
          path={RoutePaths.EditCategory}
          element={authContext.user.id ? <EditCategory /> : Redirect}
        />

        <Route
          exact
          path={RoutePaths.UpdateProfile}
          element={authContext.user.id ? <UpdateProfile /> : Redirect}
        />
      </Routes>
    </>
  );
};

export default App;
