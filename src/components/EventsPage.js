import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

const EventsPage = () => {
    const [events, setEvents] = useState([
        { name: 'Food donation camp in Mysuru', date: new Date('2025-2-3T02:00:00'), location: 'Mysuru' },
        { name: 'Visit to Orphanage in Bengaluru', date: new Date('2025-2-31T12:00:00'), location: 'Bengaluru' },
        { name: 'Community Kitchen in Chennai', date: new Date('2025-03-01T13:25:00'), location: 'Chennai' },
        { name: 'Food Drive in Hyderabad', date: new Date('2025-03-02T14:00:00'), location: 'Hyderabad' },
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setEvents((prevEvents) => prevEvents.map(event => ({
                ...event,
                timeLeft: formatTimeLeft(event.date)
            })).filter(event => event.date > now));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTimeLeft = (date) => {
        const now = new Date();
        const timeLeft = date - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const handleJoinEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseDialog = () => {
        setSelectedEvent(null);
    };

    return (
        <Container component="main" maxWidth="lg" sx={{ pt: 4 }}>
            <Typography component="h2" variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                Upcoming Events
            </Typography>
            <Grid container spacing={4}>
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {event.name}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {event.date.toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, color: 'red' }}>
                                    Time left: {event.timeLeft}
                                </Typography>
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleJoinEvent(event)}>
                                    Join Event
                                </Button>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" align="center" sx={{ width: '100%' }}>
                        No upcoming events at the moment.
                    </Typography>
                )}
            </Grid>
            <Dialog open={!!selectedEvent} onClose={handleCloseDialog}>
                <DialogTitle>Event Details</DialogTitle>
                <DialogContent>
                    {selectedEvent && (
                        <Box>
                            <Typography variant="h6">{selectedEvent.name}</Typography>
                            <Typography variant="body2">Location: {selectedEvent.location}</Typography>
                            <Typography variant="body2">Date: {selectedEvent.date.toLocaleDateString()}</Typography>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default EventsPage;