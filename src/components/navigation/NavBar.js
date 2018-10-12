import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ----- components -----
import UserIcon from '../UserIcon';

// ----- actions -----
import { logout } from '../../modules/auth';

// ----- images -----
import logo from '../../images/logo-white.png';

// ----- css -----
import './NavBar.css';

export class NavBar extends React.Component {
    render() {
        const { dispatch, user } = this.props;
        return (
            <div className="navbar">
                <div className="dropdown">
                    <button className="dropbtn"><img src={logo} className="nav-logo"></img></button>
                    <div className="dropdown-content">
                        <Link to="/home">Home</Link>
                        <Link to="/issues">Tickets</Link>
                        <Link to="/overview/new">Submit New</Link>
                        <a href="#" onClick={() => dispatch(logout())}>Log Out</a>
                    </div>
                </div>
                {/* <UserIcon user={user} /> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
})

export default connect(mapStateToProps)(NavBar)