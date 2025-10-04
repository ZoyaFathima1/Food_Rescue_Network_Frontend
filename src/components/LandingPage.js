import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, AppBar, Toolbar, TextField, Grid, Paper, Snackbar } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const images = [
        {
            src: 'https://borgenproject.org/wp-content/uploads/4-Organizations-Working-to-Fight-World-Hunger-1500x1000.jpg',
            description: 'How we helped the homeless in Hassan City.',
        },
        {
            src: 'https://miro.medium.com/v2/resize:fit:1400/1*cHPVPsy2v1klNGCouRfVCw.jpeg',
            description: 'Donations that impacted many lives in Karnataka.',
        },
        // Add more images and descriptions here
        {
            src: 'https://affairscloud.com/assets/uploads/2020/10/India-ranks-94-out-of-107-countries-in-the-Global-Hunger-Index-2020.jpg',
            description: 'Global Hunger Index ',
        },
    ];

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleContactChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Handle contact form submission logic here
        console.log('Contact form submitted:', contactForm);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', color: '#333' }}>
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <img src="https://cdn-icons-png.flaticon.com/512/996/996974.png" alt="HelpFood Logo" style={{ height: '50px', marginRight: '10px' }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif' }}>
                        Community Food Management
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/login')} sx={{ mr: 2 }}>
                        Login
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/register')}>
                        Signup
                    </Button>
                    <Button color="inherit" onClick={() => document.getElementById('about-us').scrollIntoView()}>
                        About Us
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/events')}>
                        Upcoming Events
                    </Button>
                    <Button color="inherit" onClick={() => document.getElementById('contact-us').scrollIntoView()}>
                        Contact Us
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="lg" sx={{ pt: 4 }}>
                <Typography component="h2" variant="h3" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                    Donate to make someone smile
                </Typography>
                <Carousel showThumbs={false} autoPlay infiniteLoop>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image.src} alt={`food ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
                <Box id="about-us" sx={{ mt: 8 }}>
                    <Typography component="h2" variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                        About Us
                    </Typography>
                    <Grid container spacing={4}>
                        {images.map((image, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', position: 'relative' }}>
                                    <img src={image.src} alt={`about ${index + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: 'opacity 0.3s',
                                            '&:hover': {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ p: 2 }}>
                                            {image.description}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box id="contact-us" sx={{ mt: 8 }}>
                    <Typography component="h2" variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                        Contact Us
                    </Typography>
                    <Box component="form" onSubmit={handleContactSubmit} sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    label="Your Name"
                                    fullWidth
                                    required
                                    value={contactForm.name}
                                    onChange={handleContactChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    required
                                    value={contactForm.email}
                                    onChange={handleContactChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="message"
                                    label="Message"
                                    fullWidth
                                    required
                                    multiline
                                    rows={4}
                                    value={contactForm.message}
                                    onChange={handleContactChange}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button type="submit" variant="contained" color="primary" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '1rem' }}>
                                Send Message
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Thanks for your feedback, Your Feedback matters!!"
            />
        </Box>
    );
};

export default LandingPage;