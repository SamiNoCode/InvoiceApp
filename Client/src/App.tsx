import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import { isTokenValid } from './utils/auth';
import SideMenu from './components/SideMenu';
import InvoiceTablePage from './pages/InvoiceTablePage';
import ThemeInitializer from './components/ThemeInitializer';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from './store/features/auth/authSlice';
import type { RootState } from './store/store';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(setAuthenticated(isTokenValid()));

    const interval = setInterval(() => {
      dispatch(setAuthenticated(isTokenValid()));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  const UnAuthApp = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={() => dispatch(setAuthenticated(true))} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  };

  const AuthApp = () => {
    return (
      <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
        <SideMenu />
        <div className="flex-1 pl-64">
          <Routes>
            <Route path="/invoices" element={<InvoiceTablePage />} />
            <Route path="*" element={<Navigate to="/invoices" replace />} />
          </Routes>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <ThemeInitializer />
      {isAuthenticated ? <AuthApp /> : <UnAuthApp />}
    </Router>
  );
}

export default App;
