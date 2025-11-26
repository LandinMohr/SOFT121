import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import ProductDetails from './Components/Product/ProductDetails';
import Weather from './Components/Weather';
import Products from './Components/Product/Products';
import RequireAuth from './Components/RequireAuth';
import { BrowserRouter, Link, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
        <Link to="/login">Login</Link> | <Link to="/weather">Weather</Link> |{' '}
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/weather"
          element={
            <RequireAuth>
              <Weather />
            </RequireAuth>
          }
        />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
