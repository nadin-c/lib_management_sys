import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Book from '../types/Book';

interface BookState {
  allBooks: Book[];
  favourites: Book[];
  filteredBooks: Book[];
}

const initialState: BookState = {
  allBooks: [],
  favourites: [],
  filteredBooks: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.allBooks = action.payload;
      state.filteredBooks = action.payload; 
    },
    
    setFilteredBooks: (state, action: PayloadAction<Book[]>) => {
      state.filteredBooks = action.payload;
    },
    toggleFavourite: (state, action: PayloadAction<Book>) => {
      const book = action.payload;
      const index = state.favourites.findIndex((b) => b._id === book._id);
      if (index !== -1) {
        state.favourites.splice(index, 1);
      } else {
        state.favourites.push(book);
      }
    },
  },
});

export const { setBooks, setFilteredBooks, toggleFavourite } = bookSlice.actions;
export default bookSlice.reducer;
