
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import axios from 'axios';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        userName: '',
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
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);
            console.log('Registration successful:', response.data);
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Register</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
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
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;