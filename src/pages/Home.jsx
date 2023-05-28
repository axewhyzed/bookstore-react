import React from 'react';
import '../styles/homeStyles.css';

const Home = () => {
  // Example data for featured books
  const featuredBooks = [
    { id: 1, title: 'Book 1', image: 'book1.jpg', description: 'Discover a captivating story filled with intrigue and adventure.' },
    { id: 2, title: 'Book 2', image: 'book2.jpg', description: 'Embark on a journey of self-discovery and personal growth.' },
    { id: 3, title: 'Book 3', image: 'book3.jpg', description: 'Immerse yourself in a world of love, passion, and heartache.' },
    // Add more books as needed
  ];

  // Example data for book categories
  const bookCategories = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Non-Fiction' },
    { id: 3, name: 'Mystery' },
    { id: 4, name: 'Romance' },
    // Add more categories as needed
  ];

  return (
    <div className="container">
      <header>
        {/* Navigation bar or logo here */}
      </header>

      <section className="hero">
        <div className="slider">
          {/* Add your moving slider or carousel here */}
        </div>
      </section>

      <section className="featured-books">
        <h2 className="featured-books-heading">Featured Books</h2>
        <div className="book-list">
          {/* Display featured books with images and descriptions */}
          {featuredBooks.map((book) => (
            <div key={book.id} className="book-item">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="book-categories">
        <h2 className="book-categories-heading">Book Categories</h2>
        <div className="category-list">
          {/* Display book categories with links or buttons */}
          {bookCategories.map((category) => (
            <div key={category.id} className="category-item">
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="special-offers">
        <h2 className="special-offers-heading">Special Offers</h2>
        <p className="special-offers-description">Get exclusive discounts and limited-time promotions on your favorite books.</p>
      </section>

      <footer>
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default Home;
