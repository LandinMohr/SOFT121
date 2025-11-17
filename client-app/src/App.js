import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Weather from './components/Weather';
import RequireAuth from './components/RequireAuth';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import Products from './components/products';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
        <Link to="/login">Login</Link> | <Link to="/weather">Weather</Link>
        | <Link to="/product">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/weather"
          element={
            <RequireAuth>
              <Weather />
            </RequireAuth>
          }
        />
        <Route path="/product" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
