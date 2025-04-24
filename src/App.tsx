import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx'; 
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import AdvancedSearch from './pages/AdvanceSearch';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
