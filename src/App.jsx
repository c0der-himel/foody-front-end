import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './context/AuthProvider';
import CheckOut from './pages/CheckOut';
import PrivateRoute from './routes/PrivateRoute';
import FullMenu from './pages/FullMenu';
import SearchFood from './pages/SearchFood';
import Dashboard from './pages/Dashboard';
import UserOrders from './components/UserOrders';
import MakeAnAdmin from './components/MakeAnAdmin';
import AdminRoute from './routes/AdminRoute';
import AddFoodItem from './components/AddFoodItem';
import UsersTable from './components/UsersTable';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <AuthProvider>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="orders" element={<UserOrders />} />
            <Route path="add-food-item" element={<AddFoodItem />} />
            <Route path="users" element={<UsersTable />} />
            <Route
              path="make-admin"
              element={
                <AdminRoute>
                  <MakeAnAdmin />
                </AdminRoute>
              }
            />
          </Route>
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<FullMenu />} />
          <Route path="/search" element={<SearchFood />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </AnimatePresence>
  );
}

export default App;
