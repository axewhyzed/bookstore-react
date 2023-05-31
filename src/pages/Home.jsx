import React, { useEffect, useMemo, useState } from "react";
import "../styles/homeStyles.css";
import bookService from "../services/book.service";
import { Pagination } from "@material-ui/lab";
import {
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import { useAuthContext } from "../context/auth.context";
import { defaultFilter } from "../constant/constant";
import categoryService from "../services/category.service";

const Home = () => {
  const authContext = useAuthContext();
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });

  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState(defaultFilter);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = () => {
    bookService.getAll(defaultFilter).then((res) => {
      setBookResponse(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);

  // const addToCart = (book) => {
  //   shared.addToCart(book, authContext.user.id).then((res)=>{
  //     if(res.error){
  //       toast.error(res.message);
  //     }else{
  //       toast.success(res.message);
  //       cartContext.updateCart();
  //     }
  //   })
  // }

  // Example data for featured books
  // const featuredBooks = [
  //   { id: 1, title: 'Book 1', image: 'book1.jpg', description: 'Discover a captivating story filled with intrigue and adventure.' },
  //   { id: 2, title: 'Book 2', image: 'book2.jpg', description: 'Embark on a journey of self-discovery and personal growth.' },
  //   { id: 3, title: 'Book 3', image: 'book3.jpg', description: 'Immerse yourself in a world of love, passion, and heartache.' },
  //   // Add more books as needed
  // ];

  // Example data for book categories
  // const bookCategories = [
  //   { id: 1, name: 'Fiction' },
  //   { id: 2, name: 'Non-Fiction' },
  //   { id: 3, name: 'Mystery' },
  //   { id: 4, name: 'Technology' },
  //   // Add more categories as needed
  // ];

  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  };

  const handlePageChange = (event, value) => {
    setFilters({ ...defaultFilter, pageIndex: value - 1 });
  };

  return (
    <div className="container">
      <header>{/* Navigation bar or logo here */}</header>

      <section className="hero">
        <div className="slider">
          {/* Add your moving slider or carousel here */}
        </div>
      </section>

      <section className="featured-books">
        <div className="sort-wrapper">
          <FormControl variant="outlined" className="dropdown-wrapper">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select onChange={sortBooks} value={sortBy}>
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
        </div>
        <h2 className="featured-books-heading">Featured Books</h2>
        <Grid container spacing={2}>
          {books.map((book, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="book-item">
                <img src={book.base64image} alt={book.name} className="image" />
                <CardContent>
                  <Typography variant="h6" className="book-title">
                    {book.name}
                  </Typography>
                  <Typography variant="body2" className="book-category">
                    Category: {book.category}
                  </Typography>
                  <Typography variant="body2" className="book-description">
                    {book.description}
                  </Typography>
                  <Typography variant="body2" className="book-price">
                    MRP &#8377; {book.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* <section className="book-categories">
        <h2 className="book-categories-heading">Book Categories</h2>
        <div className="category-list">
          {/* Display book categories with links or buttons */}
      {/* {bookCategories.map((category) => (
            <div key={category.id} className="category-item">
              <h3>{category.name}</h3>
            </div> */}
      {/* ))} */}
      {/* </div> */}
      {/* </section> */}

      <section className="special-offers">
        <h2 className="special-offers-heading">Special Offers</h2>
        <p className="special-offers-description">
          Get exclusive discounts and limited-time promotions on your favorite
          books.
        </p>
      </section>

      <div className="pagination-wrapper">
        <Pagination
          count={bookResponse.totalPages}
          page={filters.pageIndexs}
          onChange={handlePageChange}
        />
      </div>
      <footer>{/* Footer content here */}</footer>
    </div>
  );
};

export default Home;
