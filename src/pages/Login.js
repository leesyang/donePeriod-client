import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ----- components -----
import Form from './login/Form'

// ----- css -----
import './Login.css';

export function Login() {
    const loggedIn = useSelector(state => state.auth.currentUser !== null);

    if (loggedIn) {
        return <Navigate to="/home" replace />
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <Form />
        </div>
    )
}

export default Login;
