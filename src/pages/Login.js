import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// ----- components -----
import Form from './login/Form'

// ----- css -----
import './Login.css';

export class Login extends React.Component {
    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/home" />
        }
        return (
            <div className="login">
                <h1>Login</h1>
                <Form />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);