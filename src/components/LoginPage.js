import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, MenuItem, Alert } from '@mui/material';

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '', userType: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { token, ngoName } = response.data;
            localStorage.setItem('token', token); // Store the token in local storage
            alert(`Welcome, ${ngoName}`);
            if (credentials.userType === 'Restaurant') {
                navigate('/add-food');
            } else if (credentials.userType === 'NGO') {
                navigate('/ngo-home'); // Redirect to NGO home page
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                {errorMessage && <Alert severity="error" sx={{ width: '100%' }}>{errorMessage}</Alert>}
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
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        select
                        label="User Type"
                        name="userType"
                        value={credentials.userType}
                        onChange={handleChange}
                    >
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="NGO">NGO</MenuItem>
                        <MenuItem value="Restaurant">Restaurant</MenuItem>
                    </TextField>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        type="submit"
                    >
                        Login
                    </Button>
                    <Box sx={{ mt: 2 }}>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <Button fullWidth variant="outlined" color="secondary">
                                Don't have an account? Sign Up
                            </Button>
                        </Link>
                        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                            <Button fullWidth variant="text" color="primary">
                                Forgot Password?
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
