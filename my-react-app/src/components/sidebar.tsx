import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemText, Divider, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Используем Link для маршрутизации

// Стили для боковой панели
const DrawerContent = Box;

const SidebarComponent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      {/* Кнопка для открытия боковой панели */}
      <IconButton onClick={toggleDrawer(true)} style={{ position: 'absolute', top: 16, left: 16 }}>
        <MenuIcon />
      </IconButton>

      {/* Боковая панель */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <DrawerContent role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {/* Ссылки на страницы */}
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Главная" />
            </ListItemButton>
            <ListItemButton component={Link} to="/api/post">
              <ListItemText primary="Создать пост" />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton>
              <ListItemText primary="Настройки" />
            </ListItemButton>
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SidebarComponent;