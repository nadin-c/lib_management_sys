import React from 'react';
import './BookDetailDialog.scss';
import Book from '../types/Book';

interface BookDetailDialogProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
}

const BookDetailDialog: React.FC<BookDetailDialogProps> = ({ book, open, onClose }) => {
  if (!open || !book) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>×</button>
        <h2>{book.title}</h2>
        <div className="dialog-body">
          <img src={book.thumbnailUrl || '/placeholder-image.jpg'} alt={book.title} />
          <div className="dialog-details">
            <p><strong>Published Date:</strong> {book.publishedDate?.$date || 'Unknown'}</p>
            <p><strong>Authors:</strong> {book.authors?.join(', ') || 'Unknown'}</p>
            <p><strong>Page Count:</strong> {book.pageCount || 'N/A'}</p>
            <p><strong>Description:</strong></p>
            <div className="dialog-description">
              {book.longDescription ? book.longDescription : 'No detailed description available.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailDialog;
