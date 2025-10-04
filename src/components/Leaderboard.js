import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    backgroundColor: '#e0f7fa',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/food/leaderboard');
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();

        // Update leaderboard every 24 hours
        const interval = setInterval(fetchLeaderboard, 24 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container component="main" maxWidth="md" sx={{ pt: 4 }}>
            <Typography component="h2" variant="h4" align="center" gutterBottom>
                Leaderboard
            </Typography>
            <Paper elevation={3} sx={{ p: 4 }}>
                <List>
                    {leaderboard.map((entry, index) => (
                        <StyledListItem key={index}>
                            <Avatar sx={{ bgcolor: '#00796b', marginRight: 2 }}>
                                {index + 1}
                            </Avatar>
                            <ListItemText
                                primary={`${entry.restaurantName} - ${entry.totalDonations} donations`}
                                primaryTypographyProps={{ fontWeight: 'bold', color: '#00796b' }}
                            />
                        </StyledListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default Leaderboard;
