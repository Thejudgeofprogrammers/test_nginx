import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, FormControlLabel, Switch } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme, mode } = useThemeContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Кнопка настроек для открытия модального окна */}
      <IconButton onClick={handleOpen} color="inherit">
        <Settings />
      </IconButton>

      {/* Модальное окно для переключения темы */}
      <Dialog
        open={open}
        onClose={handleClose}
        BackdropProps={{ onClick: handleClose }}  // Закрытие при клике вне диалога
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          {/* Переключатель для светлой/тёмной темы */}
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
            label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThemeSwitcher;
