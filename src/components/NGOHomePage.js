import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NGOHomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Container component="main" maxWidth="md" sx={{ pt: 4 }}>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
                NGO Home Page
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => handleNavigate('/ngo-dashboard')}
                >
                    NGO Dashboard
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => handleNavigate('/available-foods')}
                >
                    View Food Available for Donation
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => handleNavigate('/leaderboard')}
                >
                    View Leaderboard
                </Button>
            </Box>
        </Container>
    );
};

export default NGOHomePage;
