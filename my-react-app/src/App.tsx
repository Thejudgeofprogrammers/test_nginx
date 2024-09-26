import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import MainContent from './components/MainContent';
import PrivateRoute from './utils/private-route';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
// import NotFoundModal from './components/NotFoundModal'; // Import NotFoundModal

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard/*" element={<MainContent />} />
              {/* Fallback for any unknown paths after login */}
              {/* <Route path="*" element={<NotFoundModal />} /> */}
            </Route>

            {/* Redirect all unknown paths before login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeContextProvider>
  );
};

export default App;
