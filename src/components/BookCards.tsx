import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../redux/bookSlice';
import Book from '../types/Book';
import BookDetailDialog from './BookDetailDialog';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './BookCard.scss';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: any) => state.books.favourites);
  const [openDialog, setOpenDialog] = useState(false);

  const isFavourite = favourites.some((favBook: Book) => favBook._id === book._id);

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavourite(book));
  };

  const handleCardClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div className="book-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <div className="book-card__favourite" onClick={handleFavouriteClick}>
          {isFavourite ? (
            <FaHeart className="book-card__favourite-icon filled" />
          ) : (
            <FaRegHeart className="book-card__favourite-icon" />
          )}
        </div>
        <img
          src={book.thumbnailUrl || '/placeholder-image.jpg'}
          alt={book.title}
          className="book-card__image"
        />
        <div className="book-card__content">
          <h2 className="book-card__title">{book.title}</h2>
          <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
          <p><strong>Published:</strong> {book.publishedDate?.$date || 'Unknown'}</p>
          <p><strong>Authors:</strong> {book.authors?.join(', ') || 'Unknown'}</p>
          <p><strong>Categories:</strong> {book.categories?.join(', ') || 'N/A'}</p>
        </div>
      </div>

      <BookDetailDialog
        open={openDialog}
        onClose={handleCloseDialog}
        book={{
          ...book,
          publishedDate: book.publishedDate?.$date || 'Unknown',
        }}
      />
    </>
  );
};

export default BookCard;
