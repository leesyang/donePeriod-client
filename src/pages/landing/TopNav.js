import React from 'react';
import { Link } from 'react-router-dom';

// ----- components -----
import NavButton from '../../components/navigation/NavButton';

// ----- images -----
import logoWhite from '../../images/logo-white.png';

// ----- css -----
import './TopNav.css';

export default class TopNav extends React.Component {
    render () {
        return (
            <div className="top-nav">
                <img src={logoWhite}></img>
                <nav className="top-nav-buttons">
                    <Link to="/login"><NavButton name='Login' /></Link>
                    <Link to="/signup"><NavButton name='Signup' /></Link>
                    <NavButton name="Demo" />
                </nav>
            </div>
        )
    }
}