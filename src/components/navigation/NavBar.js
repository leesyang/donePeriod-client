import React from 'react';
import { NavLink, Link } from 'react-router-dom'

// ----- components -----
import UserIcon from '../UserIcon';

// ----- css -----
import './NavBar.css'

export class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <div className="dropdown">
                    <button className="dropbtn">Places</button>
                    <div className="dropdown-content">
                        <Link to="/home">Home</Link>
                        <Link to="/overview">Overview</Link>
                        <Link to="/overview/new">Submit New</Link>
                    </div>
                </div>
                <UserIcon />
            </div>
        )
    }
}

export default NavBar