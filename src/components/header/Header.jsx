import React from "react";
import { NavLink } from "react-router-dom";
import "./headerStyles.css";
import { RoutePaths } from "../../utils/enum";
import bookService from "../../services/book.service";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, IconButton, Card, CardContent} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  searchInput: {
    color: "#fff",
  },
  resultContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    maxHeight: "300px",
    overflowY: "auto",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    zIndex: 999,
    padding: theme.spacing(1),
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
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await bookService.searchBook(searchText);
      console.log("Submitted:", result);
      setSearchResults(result);
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
      <div className={classes.searchContainer}>
        <TextField
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Books"
          InputProps={{
            className: classes.searchInput,
          }}
        />
        <IconButton color="inherit" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
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
                <Typography variant="body2" className={classes.resultDescription}>
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
