import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, MenuItem, Alert } from '@mui/material';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        userType: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const { username, email, password, phoneNumber, userType } = formData;

            // Validation for required fields
            if (!username || !email || !password || !userType) {
                setErrorMessage('Missing required fields');
                return;
            }

            // Validation for email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setErrorMessage('Invalid email format');
                return;
            }

            // Validation for phone number length
            const phoneNumberRegex = /^\d{10}$/;
            if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
                setErrorMessage('Phone number must be exactly 10 digits');
                return;
            }

            // Validation for password complexity
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (!passwordRegex.test(password)) {
                setErrorMessage('Password must be at least 6 characters long and contain both letters and numbers');
                return;
            }

            const dataToSend = { username, email, password, role: userType }; // Ensure role is set correctly
            if (phoneNumber) {
                dataToSend.phoneNumber = phoneNumber;
            }

            console.log('Sending data:', dataToSend);
            await axios.post('http://localhost:5000/api/user/register', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }); // Ensure the endpoint is correct
            console.log('User registered successfully');
            setErrorMessage(''); // Clear any previous error messages
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error);
            console.error('Error details:', error.response ? error.response.data : error.message);
            setErrorMessage(error.response ? error.response.data : 'Error registering user');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                {errorMessage && <Alert severity="error" sx={{ width: '100%' }}>{errorMessage}</Alert>}
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        select
                        label="User Type"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                    >
                        <MenuItem value="NGO">NGO</MenuItem>
                        <MenuItem value="Restaurant">Restaurant</MenuItem>
                    </TextField>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegister}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;
