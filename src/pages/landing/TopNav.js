import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ----- components -----
import NavButton from '../../components/navigation/NavButton';

// ----- actions -----
import { toggleLogin, toggleSignup, login } from '../../modules/auth';

// ----- images -----
import logoWhite from '../../images/logo-white.png';

// ----- css -----
import './TopNav.css';

export class TopNav extends React.Component {
    onClickLogin() {
        this.props.dispatch(toggleLogin(true));
    }

    onClickHome() {
        this.props.dispatch(toggleLogin(false));
    }

    onClickSignup() {
        this.props.dispatch(toggleSignup(true));
    }

    onClickDemo() {
        this.props.dispatch(login('demo', 'password123'))
    }

    render () {
        return (
            <div className="top-nav">
                <img src={logoWhite} onClick={() => this.onClickHome()} className="home-logo"></img>
                <nav className="top-nav-buttons">
                    <NavButton name='Login' onClick={() => this.onClickLogin()}/>
                    <NavButton name='Signup' onClick={() => this.onClickSignup()}/>
                    <NavButton name="Demo" onClick={() => this.onClickDemo()} />
                </nav>
            </div>
        )
    }
}

export default connect()(TopNav);