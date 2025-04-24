import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredBooks, setBooks } from '../redux/bookSlice';
import { RootState } from '../redux/store';
import bookData from '../data/bookData';
import BookCard from '../components/BookCards';
import './AdvancedSearch.scss';

const categoryOptions = [
  "Java", "Internet", "Web Development", "Software Engineering",
  "Programming", "JavaScript", "Mobile"
];

const AdvancedSearch: React.FC = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state: RootState) => state.books.allBooks);
  const filteredBooks = useSelector((state: RootState) => state.books.filteredBooks);

  useEffect(() => {
    if (allBooks.length === 0) {
      dispatch(setBooks(bookData));
    }
  }, [dispatch, allBooks]);

  const [searchParams, setSearchParams] = useState({
    title: '',
    pageCount: '',
    publishedFrom: '',
    publishedTo: '',
    status: [] as string[],
    authors: '',
    categories: [] as string[],
    isbn: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    pageCount: '',
    authors: '',
    status: '',
    isbn: '',
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      pageCount: '',
      authors: '',
      status: '',
      isbn: '',
    };

    if (searchParams.title && !/^[a-zA-Z\s\-'.]+$/.test(searchParams.title)) {
      newErrors.title = 'Title must contain only alphabets, spaces, or punctuation.';
      isValid = false;
    }

    if (searchParams.pageCount && !/^\d{1,5}$/.test(searchParams.pageCount)) {
      newErrors.pageCount = 'Page count must be a number with up to 5 digits.';
      isValid = false;
    }

    if (searchParams.authors && !/^[a-zA-Z\s\-'.]+$/.test(searchParams.authors)) {
      newErrors.authors = 'Authors must contain only alphabets, spaces, or punctuation.';
      isValid = false;
    }

    if (searchParams.status.length === 0) {
      newErrors.status = 'At least one status must be selected.';
      isValid = false;
    }

    if (searchParams.isbn && !/^\d{10,13}$/.test(searchParams.isbn)) {
      newErrors.isbn = 'ISBN must be 10 to 13 digits.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setSearchParams((prev) => {
        if (name === 'status') {
          const updated = checked
            ? [...prev.status, value]
            : prev.status.filter((v) => v !== value);
          return { ...prev, status: updated };
        }
        if (name === 'categories') {
          const updated = checked
            ? [...prev.categories, value]
            : prev.categories.filter((v) => v !== value);
          return { ...prev, categories: updated };
        }
        return prev;
      });
    } else {
      setSearchParams((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    const filtered = allBooks.filter((book) => {
      const bookDate = book.publishedDate?.$date
        ? new Date(book.publishedDate.$date).toISOString().split('T')[0]
        : null;

      return (
        (!searchParams.title || book.title.toLowerCase().includes(searchParams.title.toLowerCase())) &&
        (!searchParams.pageCount || book.pageCount === parseInt(searchParams.pageCount)) &&
        (!searchParams.publishedFrom || (bookDate && bookDate >= searchParams.publishedFrom)) &&
        (!searchParams.publishedTo || (bookDate && bookDate <= searchParams.publishedTo)) &&
        (!searchParams.status.length || searchParams.status.includes(book.status)) &&
        (!searchParams.authors || book.authors?.some((a) => a.toLowerCase().includes(searchParams.authors.toLowerCase()))) &&
        (!searchParams.categories.length || book.categories?.some((c) => searchParams.categories.includes(c))) &&
        (!searchParams.isbn || (book.isbn && book.isbn.includes(searchParams.isbn)))
      );
    });

    dispatch(setFilteredBooks(filtered));
  };

  return (
    <div className="advanced-search">
      <h1>Advanced Book Search</h1>
      <form onSubmit={handleSubmit} className="search-form">
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={searchParams.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        {/* Page Count */}
        <div className="form-group">
          <label htmlFor="pageCount">Page Count</label>
          <input
            id="pageCount"
            type="number"
            name="pageCount"
            value={searchParams.pageCount}
            onChange={handleChange}
            placeholder="Enter page count"
          />
          {errors.pageCount && <p className="error">{errors.pageCount}</p>}
        </div>

        {/* Published Date Range */}
        <div className="form-group">
          <label>Published Date Range</label>
          <div className="date-range">
            <input
              type="date"
              name="publishedFrom"
              value={searchParams.publishedFrom}
              onChange={handleChange}
              placeholder="From"
            />
            <span>to</span>
            <input
              type="date"
              name="publishedTo"
              value={searchParams.publishedTo}
              onChange={handleChange}
              placeholder="To"
            />
          </div>
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>
          <div className="checkbox-group">
            {["PUBLISH", "MEAP"].map((stat) => (
              <label key={stat}>
                <input
                  type="checkbox"
                  name="status"
                  value={stat}
                  checked={searchParams.status.includes(stat)}
                  onChange={handleChange}
                />
                {stat}
              </label>
            ))}
          </div>
          {errors.status && <p className="error">{errors.status}</p>}
        </div>

        {/* Authors */}
        <div className="form-group">
          <label htmlFor="authors">Authors</label>
          <input
            id="authors"
            type="text"
            name="authors"
            value={searchParams.authors}
            onChange={handleChange}
            placeholder="Enter author name"
          />
          {errors.authors && <p className="error">{errors.authors}</p>}
        </div>

        {/* Categories */}
        <div className="form-group">
          <label>Categories</label>
          <div className="checkbox-group">
            {categoryOptions.map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  name="categories"
                  value={cat}
                  checked={searchParams.categories.includes(cat)}
                  onChange={handleChange}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* ISBN */}
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            id="isbn"
            type="text"
            name="isbn"
            value={searchParams.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN"
          />
          {errors.isbn && <p className="error">{errors.isbn}</p>}
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit">Search</button>
        </div>
      </form>

      {/* Search Results */}
      <div className="filtered-books">
        <h2>Search Results</h2>
        {filteredBooks.length === 0 &&
        Object.values(searchParams).every((param) =>
          Array.isArray(param) ? param.length === 0 : param === ''
        ) ? (
          <p>Start searching to see results.</p>
        ) : filteredBooks.length > 0 ? (
          <div className="card-container">
            {filteredBooks.map((book) => (
              <BookCard key={book._id || book.title} book={book} />
            ))}
          </div>
        ) : (
          <p>No books found matching the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
