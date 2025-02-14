import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const PrivateRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get('/verify-token', { withCredentials: true });
                setIsAuthenticated(response.data.success);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner
    }

    if (!isAuthenticated) {
        Swal.fire({
            title: 'Access Denied',
            text: 'Please log in to access this page.',
            icon: 'warning',
            confirmButtonText: 'Go to Login',
        });

        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoutes;
