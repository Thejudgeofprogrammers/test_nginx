import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundModal: React.FC = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/'); // Redirect to a valid route (e.g., home page) when "OK" is clicked
    };

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Page Not Found</DialogTitle>
            <DialogContent>
                The page you're looking for doesn't exist.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NotFoundModal;
