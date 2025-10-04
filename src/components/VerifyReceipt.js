import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

const VerifyReceipt = () => {
    const [formData, setFormData] = useState({
        foodId: '',
        ngoName: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVerify = async () => {
        try {
            const { foodId, ngoName } = formData;
            await axios.post('http://localhost:5000/food/verify-receipt', { foodId, ngoName }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Food receipt verified successfully');
        } catch (error) {
            console.error('Error verifying food receipt:', error);
            setMessage('Error verifying food receipt');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Verify Food Receipt
                </Typography>
                {message && <Alert severity="info" sx={{ width: '100%' }}>{message}</Alert>}
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="foodId"
                        label="Food ID"
                        name="foodId"
                        value={formData.foodId}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="ngoName"
                        label="NGO Name"
                        name="ngoName"
                        value={formData.ngoName}
                        onChange={handleChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleVerify}
                    >
                        Verify
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default VerifyReceipt;
