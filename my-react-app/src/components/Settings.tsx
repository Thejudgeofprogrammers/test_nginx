import React from 'react';
import { Dialog, DialogTitle, DialogContent, FormControlLabel, Switch } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { toggleTheme, mode } = useThemeContext();
  const navigate = useNavigate();
  return (
    <Dialog
      open={true}
      onClose={() => navigate('/dashboard')}
      BackdropProps={{ onClick: () => navigate('/dashboard') }} // Закрытие при клике вне окна
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        {/* Переключение светлой/тёмной темы */}
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
          label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
