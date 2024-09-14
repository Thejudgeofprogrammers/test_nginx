import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import SidebarComponent from './components/sidebar';
import Home from './components/home';
import PostForm from './components/post';
import Register from './components/register';
import Login from './components/login';
import PrivateRoute from './components/private-route';
import Profile from './components/profile';


const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Боковая панель */}
        <SidebarComponent />

        {/* Основной контент, который занимает оставшееся пространство */}
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', marginLeft: 324 }}>
          <Routes>
            <Route path="/api/auth/login" element={<Login />} />
            <Route path="/api/auth/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/api/post" element={<PrivateRoute element={<PostForm />} />} />
            <Route path="/api/user/:id/profile" element={<PrivateRoute element={<Profile />} />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;