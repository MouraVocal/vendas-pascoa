import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { RootLayout } from './components/layout/RootLayout';
import { CartProvider } from './contexts/CartContext';
import { SignUp } from './pages/SignUp';
import { Orders } from './pages/Orders';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <RootLayout>
          <Home />
        </RootLayout>
      ),
    },
    {
      path: '/produtos',
      element: (
        <RootLayout>
          <Products />
        </RootLayout>
      ),
    },
    {
      path: '/carrinho',
      element: (
        <RootLayout>
          <Cart />
        </RootLayout>
      ),
    },
    {
      path: '/signup',
      element: (
        <RootLayout>
          <SignUp />
        </RootLayout>
      ),
    },
    {
      path: '/meus-pedidos',
      element: (
        <RootLayout>
          <Orders />
        </RootLayout>
      ),
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
