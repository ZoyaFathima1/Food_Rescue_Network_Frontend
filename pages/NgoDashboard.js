import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NgoDashboard = () => {
    const [ngoName, setNgoName] = useState('');

    useEffect(() => {
        const fetchNgoName = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/user/ngo-name', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNgoName(response.data.ngoName);
            } catch (error) {
                console.error('Error fetching NGO name:', error);
            }
        };

        fetchNgoName();
    }, []);

    return (
        <div>
            <h1>Welcome, {ngoName}</h1>
            <nav>
                <ul>
                    <li><a href="/ngo-dashboard">NGO Dashboard</a></li>
                    <li><a href="/view-food-donations">View Food Available for Donation</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default NgoDashboard;
