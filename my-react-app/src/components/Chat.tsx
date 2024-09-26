import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';

const Chat: React.FC = () => {
    const { chatId } = useParams<{ chatId: string }>();  // Get chatId from URL params
    const theme = useTheme();

    return (
        <Box sx={{ padding: theme.spacing(2) }}>
            <Typography variant="h4" gutterBottom>
                Chat {chatId}
            </Typography>
            <Typography variant="body1">
                Welcome to Chat {chatId}. This is where the conversation would appear.
            </Typography>
        </Box>
    );
};

export default Chat;
