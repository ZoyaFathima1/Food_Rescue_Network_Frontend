// filepath: /c:/Users/spand/Downloads/Webtrial/Webtrial/frontend/src/components/ForgotPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/user/forgot-password', { email });
            setMessage('Password reset instructions sent to your email');
        } catch (error) {
            console.error('Error sending reset instructions:', error);
            setMessage('Error sending reset instructions');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        type="submit"
                    >
                        Send Reset Instructions
                    </Button>
                    {message && <Typography color="textSecondary" sx={{ mt: 2 }}>{message}</Typography>}
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPasswordPage;