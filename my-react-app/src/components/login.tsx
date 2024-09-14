import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import axios from 'axios';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            console.log('Login successful:', response.data);
            // Save token and redirect if needed
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Login</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;