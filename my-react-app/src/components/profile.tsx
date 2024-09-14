import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { logout } from '../utils/auth'; // Предполагается, что у вас есть функция для выхода из системы
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Удаляем токен из localStorage
    navigate('/api/auth/login'); // Перенаправляем на страницу логина
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Профиль пользователя</Typography>
      <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 2 }}>
        Выйти
      </Button>
    </Box>
  );
};

export default Profile;