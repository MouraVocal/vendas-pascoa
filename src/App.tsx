import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { Products } from './pages/Products';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/produtos',
      element: <Products />,
    },
    {
      path: '/carrinho',
      element: <Cart />,
    },
  ],
  {
    basename: '/vendas-pascoa',
  }
);

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
