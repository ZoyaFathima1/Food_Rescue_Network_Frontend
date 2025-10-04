import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const NGODonations = () => {
    const { ngoName } = useParams();
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/food/donations/${ngoName}`); // Correct endpoint
                setDonations(response.data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };

        fetchDonations();
    }, [ngoName]);

    return (
        <Container component="main" maxWidth="md" sx={{ pt: 4 }}>
            <Typography component="h2" variant="h4" align="center" gutterBottom>
                Donations for {ngoName}
            </Typography>
            <Paper elevation={3} sx={{ p: 4 }}>
                <List>
                    {donations.map((donation, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${donation.restaurantName} - ${donation.donationCount} donations`}
                                secondary={`Month: ${donation.month}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default NGODonations;
