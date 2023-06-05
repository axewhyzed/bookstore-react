import React, { createContext } from "react";
import { useState } from "react";
import cartService from "../services/cart.service";
import { useContext } from "react";
import { useAuthContext } from "./auth.context";
import { useEffect } from "react";

const initialCartDetails = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

const CartContext = createContext(initialCartDetails);

export const CartWrapper = ({ children }) => {
  const authContext = useAuthContext();
  const [cartData, setCartData] = useState([]);

  const emptyCart = () => {
    setCartData([]);
  };

  const updateCart = (updatedCartList) => {
    if (updatedCartList) {
      setCartData(updatedCartList);
    } else if (authContext.user.id) {
      cartService.getList(authContext.user.id).then((res) => setCartData(res));
    }
  };

  useEffect(() => {
    updateCart();
  }, [authContext.user.id]);

  const value = {
    cartData,
    emptyCart,
    updateCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
