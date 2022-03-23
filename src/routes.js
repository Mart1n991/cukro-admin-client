import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';
import ProductsList from './pages/ProductsList';
import Product from './pages/Product';
import OrderList from './pages/OrderList';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'ucet', element: <Account /> },
      { path: 'enums', element: <ProductsList /> },
      { path: 'zakaznici', element: <CustomerList /> },
      { path: 'prehlad', element: <Dashboard /> },
      { path: 'produkty', element: <ProductList /> },
      { path: 'produkt/novy', element: <Product /> },
      { path: 'produkt/:id', element: <Product /> },
      { path: 'objednavky', element: <OrderList /> },
      { path: 'nastavenia', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/prehlad" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
