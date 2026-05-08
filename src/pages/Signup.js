import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ----- components -----
import Form from './signup/Form'

export function Signup() {
    const loggedIn = useSelector(state => state.auth.currentUser !== null);

    if (loggedIn) {
        return <Navigate to="/home" replace />
    }
    return (
        <div className="signup">
            <Form />
        </div>
    )
}

export default Signup;
