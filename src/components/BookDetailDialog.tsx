import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './BookDetailDialog.scss';

interface BookDetailDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  thumbnailUrl: string;
  publishedDate?: string;
  authors?: string[];
  pageCount?: number;
  longDescription?: string;
}

const BookDetailDialog: React.FC<BookDetailDialogProps> = ({
  open,
  onClose,
  title,
  thumbnailUrl,
  publishedDate = 'Unknown',
  authors = [],
  pageCount,
  longDescription = 'No detailed description available.',
}) => {
  const getImageUrl = () => {
    try {
      return thumbnailUrl ? thumbnailUrl : '/placeholder-image.jpg';
    } catch (error) {
      console.error('Invalid thumbnail URL:', error);
      return '/placeholder-image.jpg';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth className="book-dialog">
      <DialogTitle>
        {title}
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close" className="book-dialog__close-btn">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} className="book-dialog__image-container">
            <img
              src={getImageUrl()}
              alt={`${title} cover`}
              className="book-dialog__image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} className="book-dialog__info">
            <Typography><strong>Published Date:</strong> {publishedDate}</Typography>
            <Typography><strong>Authors:</strong> {authors.length > 0 ? authors.join(', ') : 'Unknown'}</Typography>
            <Typography><strong>Page Count:</strong> {pageCount || 'N/A'}</Typography>
            <Typography><strong>Description:</strong></Typography>
            <Typography variant="body2">{longDescription}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailDialog;
