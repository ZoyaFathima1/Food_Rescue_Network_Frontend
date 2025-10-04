import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AvailableFoodsPage = () => {
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]);
    const [ngoName, setNgoName] = useState('');

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/food/available'); // Ensure the endpoint is correct
                setFoodItems(response.data);
            } catch (error) {
                console.error('Error fetching food items:', error);
                alert('Failed to fetch food items. Please try again later.');
            }
        };
        fetchFoodItems();

        const fetchNgoName = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/user/ngo-name', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNgoName(response.data.ngoName);
            } catch (error) {
                console.error('Error fetching NGO name:', error);
                alert('Failed to fetch NGO name. Please try again later.');
            }
        };
        fetchNgoName();
    }, []);

    const handleRequestFood = async (foodId, restaurantName) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/food/request', { foodId, ngoName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(`Request sent to ${restaurantName}`);
            setFoodItems(foodItems.map(food => food.id === foodId ? { ...food, status: 'donated' } : food));
        } catch (error) {
            console.error('Error requesting food:', error);
            alert('Failed to send request. Please try again later.');
        }
    };

    const handleLogout = () => {
        // Handle logout logic here, e.g., clearing tokens or session storage
        navigate('/'); // Redirect to landing page
    };

    return (
        <Box>
            <AppBar position="static" sx={{ width: '100vw', left: 0, right: 0, marginLeft: 'calc(-50vw + 50%)' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Available Foods
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="lg">
                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Available Foods for Donation
                    </Typography>
                    <Typography component="h2" variant="h6">
                        Welcome, {ngoName}
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {foodItems.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                                    <img src={item.imageUrl} alt={item.foodName} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                    <Typography variant="h6">{item.foodName}</Typography>
                                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                    <Typography variant="body2">Restaurant: {item.restaurantName}</Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                        disabled={item.status === 'donated'}
                                        onClick={() => handleRequestFood(item.id, item.restaurantName)}
                                    >
                                        {item.status === 'donated' ? 'Donated' : 'Request'}
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default AvailableFoodsPage;
