import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./headerStyles.css";
import { RoutePaths } from "../../utils/enum";
import bookService from "../../services/book.service";
import "react-toastify/dist/ReactToastify.css";
import { TextField, List, AppBar, ListItem, Button } from "@material-ui/core";
import new_logo from "../../assets/new_logo.svg";
import shared from "../../utils/shared";
import { useAuthContext } from "../../context/auth.context";

const Header = () => {
  const open = false;
  const authContext = useAuthContext();
  // const classes = headerStyle();
  const [query, setquery] = useState("");
  const [bookList, setbookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);

  const items = useMemo(() => {
    return shared.NavigationItems;
  }, []);

  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };

  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setbookList(res);
  };

  const search = () => {
    document.body.classList.add("search-results-open");
    searchBook();
    setOpenSearchResult(true);
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
                  <>
                    <ListItem>
                      <NavLink to={RoutePaths.Login} title="Login">
                        Login
                      </NavLink>
                    </ListItem>
                    <ListItem>
                      <Link to={RoutePaths.Register} title="Register">
                        Register
                      </Link>
                    </ListItem>
                  </>
                )}
                {authContext.user.id && (
                  <div className="header-components-wrapper">
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
          className="search-overlay"
          onClick={() => {
            setOpenSearchResult(false);
            document.body.classList.remove("search-results-open");
          }}
        ></div>
        <div
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
                                    <span className="title">{item.name}</span>
                                    <p
                                      style={{
                                        width: "400px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {item.description}
                                    </p>
                                  </div>
                                  <div className="right-col">
                                    <span className="price">{item.price}</span>
                                    <Button>
                                      <Link
                                        onClick={() => {}}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                onClick={search}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </AppBar>
    </header>
  );
};

export default Header;
