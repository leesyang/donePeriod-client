import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ----- actions -----
import { logout } from '../../modules/auth';

// ----- images -----
import logo from '../../images/logo-white.png';

// ----- css -----
import './NavBar.css';

export function NavBar() {
    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <div className="dropdown">
                <button className="dropbtn"><img src={logo} alt="app logo" className="nav-logo"></img></button>
                <div className="dropdown-content">
                    <Link to="/home">Home</Link>
                    <Link to="/issues">Tickets</Link>
                    <Link to="/overview/new">Submit New</Link>
                    <Link to="/" onClick={() => dispatch(logout())}>Log Out</Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
