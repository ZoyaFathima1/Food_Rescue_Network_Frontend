import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NGOPage = () => {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [greeting, setGreeting] = useState('');
    const [ngoName, setNgoName] = useState('');

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/food/donations/${ngoName}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDonations(response.data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };

        const fetchNgoName = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/user/ngo-name', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNgoName(response.data.ngoName);
                fetchDonations(); // Fetch donations after fetching NGO name
            } catch (error) {
                console.error('Error fetching NGO name:', error);
                alert('Failed to fetch NGO name. Please try again later.');
            }
        };

        fetchNgoName();

        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, [ngoName]);

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Box sx={{ backgroundColor: '#e0f7fa', minHeight: '100vh', color: '#333' }}>
            <AppBar position="static" sx={{ backgroundColor: '#00796b' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif' }}>
                        NGO Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="md" sx={{ pt: 4 }}>
                <Typography component="h2" variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                    {greeting}, {ngoName}
                </Typography>
                <Typography component="h3" variant="h5" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif' }}>
                    Donations Received
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Restaurant Name</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Donation Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donations.map((donation, index) => (
                                <TableRow key={index}>
                                    <TableCell>{donation.restaurantName}</TableCell>
                                    <TableCell>{donation.month}</TableCell>
                                    <TableCell>{donation.donationCount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default NGOPage;
