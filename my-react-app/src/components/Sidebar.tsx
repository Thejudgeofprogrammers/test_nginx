import React from 'react';
import { Button, Box, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme(); // Получаем доступ к текущей теме

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box 
                sx={{ 
                    width: 250, 
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    height: '100vh'
                }}
            >
                <List>
                    <ListItem>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" onClick={handleLogout}>Logout</Button>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;
