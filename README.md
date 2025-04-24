# 📚 Library Management System

A Library Management System built with React, TypeScript, Redux Toolkit, and Vite. This application allows users to browse, search, and manage books efficiently with features like advanced filters, favorites, and detailed views—all in a fully responsive design.

## 🚀 Features

- 🔍 **Global Search**: Search for books by title from the header.
- 🧠 **Advanced Filters**: Refine results by title, authors, categories, ISBN, page count, publication dates, and status.
- ❤️ **Favorites**: Add or remove books from your favorites list.
- 📘 **Book Details Dialog**: View complete details of any book in a modal dialog.
- 📱 **Responsive UI**: Works seamlessly across desktop and mobile devices.
- 🗂 **Pagination Support**: Efficiently display large book lists.

## 🗂 Project Structure

```
├── public/                   # Static assets
├── src/
│   ├── assets/               # Icons, images, etc.
│   ├── components/           # Reusable UI components
│   ├── data/                 # JSON dataset of books
│   ├── pages/                # Page-level components (Home, Favourites, etc.)
│   ├── redux/                # Redux store and slices
│   ├── types/                # TypeScript interfaces and types
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Vite entry point
│   └── index.css             # Global CSS / SCSS
├── package.json              # Project scripts and dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite bundler config
└── README.md                 # Project documentation
```

## 📦 Installation

1. Clone the Repository:

   ```bash
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Start the Development Server:

   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

## 📜 Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Run the app in development mode    |
| `npm run build` | Build the app for production       |
| `npm run preview` | Preview the production build     |
| `npm run lint`  | Run ESLint for code quality checks |

## 🛠 Technologies Used

- ⚛️ **React**
- 🟦 **TypeScript**
- 📦 **Redux Toolkit**
- ⚡ **Vite**
- 🎨 **SCSS**
- 🧩 **Material-UI (MUI)**

## 📄 Pages

- 🏠 **Home**: Displays a paginated grid of books with options to view details or add to favorites.
- 💖 **Favourites**: Shows a list of books marked as favorites with pagination.
- 🧮 **Advanced Search**: Allows users to filter books by multiple criteria such as title, authors, categories, and more.

## 🔧 State Management

The application uses **Redux Toolkit** to manage the state of books, favorites, and filtered results. The state is structured as follows:

```typescript
interface BookState {
  allBooks: Book[];
  favourites: Book[];
  filteredBooks: Book[];
}
```

## 📄 Pages Overview

- **🏠 Home Page**: Displays a paginated grid of all books. Users can view book details or add books to their favorites.
- **💖 Favourites Page**: Shows a list of books marked as favorites with pagination. Users can remove books from their favorites.
- **🧮 Advanced Search Page**: Allows users to filter books by title, authors, categories, ISBN, page count, publication dates, and status.
- **🔍 Search Results Section**: Displays books matching the global search query entered in the header.
- **📘 Book Details Dialog**: Provides detailed information about a selected book in a modal dialog.

Each page is fully integrated with Redux for state management, ensuring a smooth and responsive user experience.

## 🧱 Components

- **BookCard.tsx**: Displays book information in a card format.
- **Header.tsx**: Contains navigation links and a search bar.
- **BookDetailDialog.tsx**: Shows detailed information about a book in a modal dialog.
- **Pagination, Filter, and Loading components**: Additional reusable components.

## 📸 Screenshots

- **Home Page**: ![Home Page](https://via.placeholder.com/800x400)
- **Advanced Search**: ![Advanced Search](https://via.placeholder.com/800x400)
- **Favourites**: ![Favourites](https://via.placeholder.com/800x400)

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "Added new feature"`.
4. Push to your fork: `git push origin feature-name`.
5. Create a pull request.

## ⚖️ License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)