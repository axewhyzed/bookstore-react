import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./headerStyles.css";
import { RoutePaths } from "../../utils/enum";
import bookService from "../../services/book.service";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  IconButton,
  Card,
  CardContent,
} from "@material-ui/core";
import new_logo from "../../assets/new_logo.svg";

const useStyles = makeStyles((theme) => ({
  resultsContainer: {
    width: "70vh",
  },
  resultCard: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
  resultImage: {
    width: 60,
    height: 90,
    objectFit: "cover",
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  resultDetails: {
    flex: 1,
    marginLeft: theme.spacing(2),
  },
  resultName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  resultDescription: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  resultPrice: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  
  const searchBooks = async (query) => {
    try {
      const result = await bookService.searchBook(query);
      setSearchResults(result.slice(0,5));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      searchBooks(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <header className="header">
      <nav className="navbar">
        <img src={new_logo} alt="new-logo" width="180px" />
        <div className={classes.searchContainer}>
          <TextField
            placeholder="Search Books"
            InputProps={{
              className: classes.searchInput,
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </div>
        <div className="link-bar">
          <NavLink to={RoutePaths.Home} className="navbar-link">
            Home
          </NavLink>
          <NavLink to={RoutePaths.Login} className="navbar-link">
            Login
          </NavLink>
          <NavLink to={RoutePaths.Register} className="navbar-link">
            Register
          </NavLink>
        </div>
      </nav>
      {searchResults.length > 0 && (
        <div className={classes.resultsContainer}>
          <Typography variant="h6">Search Results:</Typography>
          <div className={classes.resultsList}>
            {searchResults.map((result) => (
              <Card key={result.id} className={classes.resultCard}>
                <img
                  src={result.base64image}
                  alt="book-pic"
                  className={classes.resultImage}
                />
                <CardContent className={classes.resultDetails}>
                  <Typography variant="h6" className={classes.resultName}>
                    {result.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.resultDescription}
                  >
                    {result.description}
                  </Typography>
                  <Typography variant="body2" className={classes.resultPrice}>
                    Price: {result.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
