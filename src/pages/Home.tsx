import React, { useState } from 'react';
import bookData from '../data/bookData';
import BookCard from '../components/BookCards';
import { Pagination } from '@mui/material';
import './Home.scss';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 24; 
  const cardsPerRow = 4;  

  
  const indexOfLastBook = currentPage * cardsPerPage;
  const indexOfFirstBook = indexOfLastBook - cardsPerPage;
  const currentBooks = bookData.slice(indexOfFirstBook, indexOfLastBook);

  
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <div className="book-grid">
        {currentBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      <Pagination
        count={Math.ceil(bookData.length / cardsPerPage)} 
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        className="pagination"
      />
    </div>
  );
};

export default Home;
