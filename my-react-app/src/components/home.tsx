import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to My App
        </Typography>
        <Typography variant="h5" paragraph>
          This is the home page of our awesome app built with React and MUI.
        </Typography>
        <Button variant="contained" color="primary" href="/api/post">
          Go to Posts
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
