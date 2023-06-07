import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./headerStyles.css";
import { RoutePaths } from "../../utils/enum";
import bookService from "../../services/book.service";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { TextField, List, AppBar, ListItem, Button } from "@material-ui/core";
import new_logo from "../../assets/new_logo.svg";
import shared from "../../utils/shared";
import { useAuthContext } from "../../context/auth.context";
import { useCartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const open = false;
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();

  const searchOverlayRef = useRef(null);
  const searchContainerRef = useRef(null);

  const [query, setquery] = useState("");
  const [bookList, setbookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);

  const items = useMemo(() => {
    return shared.NavigationItems.filter((item) =>
    shared.hasAccess(item.route, authContext.user));
  }, [authContext.user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchOverlayRef.current &&
        !searchOverlayRef.current.contains(event.target) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setOpenSearchResult(false);
        document.body.classList.remove("search-results-open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };

  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setbookList(res.slice(0, 5));
  };

  const search = () => {
    document.body.classList.add("search-results-open");
    searchBook();
    setOpenSearchResult(true);
  };

  const addToCart = (book) => {
    if (!authContext.user.id) {
      navigate(RoutePaths.Login);
      toast.error("Please login before adding books to cart");
      return;
    } else {
      shared.addToCart(book, authContext.user.id).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Item added in cart");
          cartContext.updateCart();
        }
      });
    }
  };

  return (
    <header className="header-wrapper">
      <AppBar
        className="site-header"
        id="header"
        position="static"
        style={{ backgroundColor: "white" }}
      >
        <div className="bottom-header">
          <div className="container">
            <div className="logo-wrapper">
              <List
                className="top-nav-bar"
                style={{
                  display: "flex",
                }}
              >
                <ListItem>
                  <Link to="/" className="site-logo" title="logo">
                    <img src={new_logo} alt="ReadWrite-logo" width="180px" />
                  </Link>
                </ListItem>
                {!authContext.user.id && (
                  <div className="login-register-buttons">
                    <ListItem>
                      <Button>
                        <Link
                          to={RoutePaths.Login}
                          title="Login"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Login
                        </Link>
                      </Button>
                    </ListItem>
                    <ListItem>
                      <Button>
                        <Link
                          to={RoutePaths.Register}
                          title="Register"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Register
                        </Link>
                      </Button>
                    </ListItem>
                  </div>
                )}
                {authContext.user.id && (
                  <div className="header-components-wrapper">
                    <ListItem>
                      <Button>
                        <Link
                          to={RoutePaths.Home}
                          title="Home"
                          style={{ textDecoration: "none", color: "black" }}
                        >Home</Link>
                      </Button>
                    </ListItem>
                    {items.map((item, index) => (
                      <ListItem key={index}>
                        <Button>
                          <Link
                            to={item.route}
                            title={item.name}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {item.name}
                          </Link>
                        </Button>
                      </ListItem>
                    ))}

                    <ListItem>
                      <Button>
                        <Link
                          to="/cart"
                          title="Cart"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Cart
                          {cartContext.cartData.length > 0 && (
                            <sup className="cart-counter">
                              <span>{cartContext.cartData.length}</span>
                            </sup>
                          )}
                        </Link>
                      </Button>
                    </ListItem>

                    <ListItem>
                      <Button title="Logout" onClick={authContext.signOut}>
                        Logout
                      </Button>
                    </ListItem>
                  </div>
                )}
              </List>
              <List className="cart-country-wrap">
                <ListItem className="hamburger" onClick={openMenu}>
                  <span></span>
                </ListItem>
              </List>
            </div>
          </div>
        </div>
        <div
          ref={searchOverlayRef}
          className="search-overlay"
          onClick={() => {
            setOpenSearchResult(false);
            document.body.classList.remove("search-results-open");
          }}
        ></div>
        <div
          ref={searchContainerRef}
          className="header-search-wrapper"
          style={{ alignItems: "center", justifyContent: "space-around" }}
        >
          <div className="container">
            <div className="header-search">
              <div className="text-wrapper">
                <TextField
                  id="text"
                  name="text"
                  placeholder="What are you looking for..."
                  variant="outlined"
                  value={query}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onChange={(e) => setquery(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={search}
                >
                  Search
                </Button>

                {openSearchResult && (
                  <>
                    <div className="product-listing">
                      {bookList?.length === 0 && (
                        <p className="no-product">No product found</p>
                      )}
                      <List className="related-product-list">
                        {bookList?.length > 0 &&
                          bookList.map((item, i) => {
                            return (
                              <ListItem key={i} style={{ color: "black" }}>
                                <div
                                  className="inner-block"
                                  style={{ display: "flex" }}
                                >
                                  <div className="left-col">
                                    <b>
                                      <span className="title">{item.name}</span>
                                    </b>
                                    <p
                                      style={{
                                        width: "250px",
                                        height: "40px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {item.description}
                                    </p>
                                  </div>
                                  <div className="right-col">
                                    <span className="price">
                                      Rs. {item.price}
                                    </span>
                                    <Button>
                                      <Link
                                        onClick={() => addToCart(item)}
                                        style={{
                                          textDecoration: "none",
                                          color: "green",
                                        }}
                                      >
                                        Add to cart
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </ListItem>
                            );
                          })}
                      </List>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    </header>
  );
};

export default Header;
