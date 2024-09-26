import React, { useState, useEffect } from 'react';
import { Avatar, Box, Typography, useTheme, ButtonBase, Divider, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Settings as SettingsIcon, ExitToApp } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SettingsModal from './SettingsModal'; 
import axios from 'axios'; // For API requests
import getCookieValue from '../utils/Cookie-parse';

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [chats, setChats] = useState<any[]>([]);  // Store the list of chats
    const [isCreateChatOpen, setIsCreateChatOpen] = useState(false); // Dialog state
    const [newChatTitle, setNewChatTitle] = useState('');

    // Fetch chat list on mount (you can move this to a custom hook)
    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const userEmail = getCookieValue('userEmail'); // Используйте правильное значение
            if (userEmail) {
                const res: any = await axios.get(`http://localhost:8080/api/chat?email=${userEmail}`);
                setChats(res.data);
            } else {
                console.error("User email is not found in cookies");
            }
        } catch (error) {
            console.error("Failed to fetch chats:", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleOpenSettings = () => {
        setIsSettingsOpen(true);
    };

    const handleCloseSettings = () => {
        setIsSettingsOpen(false);
    };

    const handleOpenCreateChat = () => {
        setIsCreateChatOpen(true);
    };

    const handleCloseCreateChat = () => {
        setIsCreateChatOpen(false);
    };

    const handleCreateChat = async () => {
        try {
            const userEmail = getCookieValue('userEmail'); // Get user email from cookies
            if (!userEmail) throw new Error("User email is not found in cookies.");
            
            const data = { title: newChatTitle, creator: userEmail }; // Add userEmail as creator
            await axios.post('http://localhost:8080/api/chat', data);
            await fetchChats(); // Refresh chat list
            setIsCreateChatOpen(false);
        } catch (error) {
            console.error("Failed to create chat:", error);
        }
    };
    

    const ChatItem: React.FC<{ avatarSrc: string, title: string, onClick: () => void }> = ({ avatarSrc, title, onClick }) => (
        <ButtonBase
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                padding: theme.spacing(1, 2),
                borderRadius: 1,
                textAlign: 'left',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                }
            }}
        >
            <Avatar src={avatarSrc} sx={{ marginRight: theme.spacing(2) }} />
            <Typography variant="body1" noWrap>
                {title}
            </Typography>
        </ButtonBase>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Box 
                sx={{ 
                    width: 280, 
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingTop: theme.spacing(2),
                }}
            >
                {/* Chat List */}
                <Box sx={{ flexGrow: 1 }}>
                    {chats.map(chat => (
                        <ChatItem
                            key={chat._id}
                            avatarSrc="/default-avatar.jpg"
                            title={chat.title}
                            onClick={() => navigate(`/chat/${chat._id}`)}
                        />
                    ))}

                    <Divider />
                </Box>

                {/* Create Chat Button */}
                <Box sx={{ p: 2 }}>
                    <Button onClick={handleOpenCreateChat} variant="contained" fullWidth>
                        Create Chat
                    </Button>
                </Box>

                {/* Settings and Logout */}
                <Box sx={{ p: 2 }}>
                    <ButtonBase onClick={handleOpenSettings} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <SettingsIcon />
                        <Typography variant="body1" sx={{ ml: 1 }}>Settings</Typography>
                    </ButtonBase>
                    
                    <ButtonBase onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center' }}>
                        <ExitToApp />
                        <Typography variant="body1" sx={{ ml: 1 }}>Logout</Typography>
                    </ButtonBase>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>

            {/* Create Chat Dialog */}
            <Dialog open={isCreateChatOpen} onClose={handleCloseCreateChat}>
                <DialogTitle>Create a new chat</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Chat Title"
                        fullWidth
                        variant="standard"
                        value={newChatTitle}
                        onChange={(e) => setNewChatTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateChat}>Cancel</Button>
                    <Button onClick={handleCreateChat}>Create</Button>
                </DialogActions>
            </Dialog>

            {/* Render the Settings Modal */}
            {isSettingsOpen && <SettingsModal onClose={handleCloseSettings} />}
        </Box>
    );
};

export default Sidebar;
