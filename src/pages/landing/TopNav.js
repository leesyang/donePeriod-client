import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ----- components -----
import NavButton from '../../components/navigation/NavButton';
import LoaderExtraSm from '../../components/LoaderExtraSm';

// ----- actions -----
import { toggleLogin, toggleSignup, login } from '../../modules/auth';

// ----- images -----
import logoWhite from '../../images/logo-white.png';

// ----- css -----
import './TopNav.css';

export function TopNav() {
    const dispatch = useDispatch();
    const loggingIn = useSelector(state => state.auth.loading);

    function onClickLogin() {
        dispatch(toggleLogin(true));
    }

    function onClickHome() {
        dispatch(toggleLogin(false));
    }

    function onClickSignup() {
        dispatch(toggleSignup(true));
    }

    function onClickDemo() {
        dispatch(login('demo', 'password123'));
    }

    let navButtons;
    if (loggingIn) {
        navButtons = (
            <nav className="top-nav-buttons">
                <NavButton name='Login' onClick={onClickLogin}/>
                <NavButton name='Signup' onClick={onClickSignup}/>
                <NavButton name="Demo" onClick={onClickDemo} />
                <LoaderExtraSm />
            </nav>)
    } else {
        navButtons = (
            <nav className="top-nav-buttons">
                <NavButton name='Login' onClick={onClickLogin}/>
                <NavButton name='Signup' onClick={onClickSignup}/>
                <NavButton name="Demo" onClick={onClickDemo} />
            </nav>)
    }

    return (
        <div className="top-nav">
            <img src={logoWhite} alt="app logo" onClick={() => onClickHome()} className="home-logo"></img>
            {navButtons}
        </div>
    )
}

export default TopNav;
