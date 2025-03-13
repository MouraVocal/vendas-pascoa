import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { Products } from './pages/Products';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <CartProvider>
          <BrowserRouter basename={'/vendas-pascoa'}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/carrinho" element={<Cart />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
