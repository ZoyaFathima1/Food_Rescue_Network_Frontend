import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const AddFoodPage = () => {
    const [formData, setFormData] = useState({
        foodName: '',
        quantity: '',
        imageUrl: '',
        restaurantName: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddFood = async () => {
        try {
            const dataToSend = {
                ...formData,
                quantity: parseInt(formData.quantity, 10), // Ensure quantity is sent as an integer
            };
            console.log('Sending data:', dataToSend); // Log the data being sent
            await axios.post('http://localhost:5000/api/food/add', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Food added successfully');
            // Reset the form data to initial values
            setFormData({
                foodName: '',
                quantity: '',
                imageUrl: '',
                restaurantName: '',
            });
        } catch (error) {
            console.error('Error adding food:', error);
            console.error('Error details:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Add Food
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="foodName"
                        label="Food Name"
                        name="foodName"
                        autoComplete="foodName"
                        autoFocus
                        value={formData.foodName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="quantity"
                        label="Quantity"
                        name="quantity"
                        autoComplete="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="imageUrl"
                        label="Image URL"
                        name="imageUrl"
                        autoComplete="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="restaurantName"
                        label="Restaurant Name"
                        name="restaurantName"
                        autoComplete="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleAddFood}
                    >
                        Add Food
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddFoodPage;