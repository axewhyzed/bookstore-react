import React, { createContext, useContext, useEffect, useState } from "react";
import shared from "../utils/shared.js";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePaths } from "../utils/enum.js";
import { toast } from "react-toastify";

const initialUserValue = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  roleId: 0,
  role: "",
  password: "",
};

const initialState = {
  setUser: () => {},
  user: initialUserValue,
  signOut: () => {},
};

const authContext = createContext(initialState);

export const AuthWrapper = ({ children }) => {
  const [user, _setUser] = useState(initialUserValue);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const setUser = (user) => {
      localStorage.setItem(shared.LocalStorageKeys.USER, JSON.stringify(user));
      _setUser(user);
  };

  const signOut = () => {
    localStorage.removeItem(shared.LocalStorageKeys.USER);
    _setUser(initialUserValue);
    navigate(RoutePaths.Login);
  };

  useEffect(() => {
    const str =
      JSON.parse(localStorage.getItem(shared.LocalStorageKeys.USER)) ||
      initialUserValue;
    if(str.id) {
      _setUser(str);
    }
    if(!str.id) {
      navigate(RoutePaths.Login);
    }
  }, []);

  useEffect(() => {
    if(pathname === RoutePaths.Login && user.id) {
      navigate(RoutePaths.Home);
    }

    if(!user.id) {
      return;
    }

    const access = shared.hasAccess(pathname, user);
    if(!access) {
      toast.warning("Sorry, you are not authorized to access this page");
      navigate(RoutePaths.Home);
      return;
    }
    // eslint-disable-next-line import/no-anonymous-default-export
  }, [pathname, user]);

  const value = {
    user,
    setUser,
    signOut,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(authContext);
};
