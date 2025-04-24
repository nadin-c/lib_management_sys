import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Book } from '../data/bookData';
import BookCard from '../components/BookCards';
import './Favourites.scss';

const Favourites = () => {
  const favourites = useSelector((state: any) => state.books.favourites);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentBooks = favourites.slice(startIndex, startIndex + cardsPerPage);
  const totalPages = Math.ceil(favourites.length / cardsPerPage);

  return (
    <div className="favourites">
      <h1>Favourites</h1>

      <div className="grid-container">
        {currentBooks.map((book: Book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? 'active' : ''}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
