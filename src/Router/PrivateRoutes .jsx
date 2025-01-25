import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const PrivateRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [alertShown, setAlertShown] = useState(false);

    if (!user) {
        if (!alertShown) {
            setAlertShown(true);
            Swal.fire({
                title: 'Access Denied',
                text: 'Please log in to access this page.',
                icon: 'warning',
                confirmButtonText: 'Go to Login',
            }).then(() => {
                setAlertShown(false);
            });
        }

        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoutes;
