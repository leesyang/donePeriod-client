import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// ----- components -----
import TopNav from './landing/TopNav'
import LoginForm from './login/Form';
import SignUpForm from './signup/Form';

// ----- images -----
import homeDash from '../images/home-dash.png';
import homeDashFeed from '../images/home-dash-feed.png';
import ticketImg from '../images/ticket.PNG';

// ----- css -----
import './Landing.css';

export function Landing() {
    const showLogin = useSelector(state => state.auth.logIn);
    const showSignUp = useSelector(state => state.auth.signUp);
    const loggedIn = useSelector(state => Boolean(state.auth.currentUser));

    if(loggedIn){
        return <Navigate to="/home" replace />
    }

    let loginView = showLogin? (
        <div className="login-container">
            <p>Login</p>
            <LoginForm />
        </div>) : undefined;

    let landingBanner = !showLogin && !showSignUp ? (
        <div className="landing-container l-section1">
            <h1>donePeriod</h1>
            <p>Keep track of your team's tasks so that things get done.</p>
        </div>
    ): undefined;

    let signUpView = showSignUp? (
        <div className="login-container">
            <p>SignUp</p>
            <SignUpForm />
        </div>) : undefined;

    return (
        <div className="landing">
        <TopNav />
        {loginView}
        {signUpView}
        {landingBanner}
        <div className="landing-container l-section2">
            <img src={homeDash} alt="home page dashboard example"></img>
            <img src={homeDashFeed} alt="home page feed example"></img>
            <p>a no-frills approach to the dashboard. see just what you need to see.</p>
        </div>
        <div className="landing-container l-section2 l-section3 ">
            <p>tasks that make sense</p>
            <img src={ticketImg} alt="ticket view example"></img>
            <p>easily see progress</p>
        </div>
        <div className="landing-container l-section4">
            <p>© Copyright 2018. All rights reserved.</p>
        </div>
    </div>
    )
}

export default Landing;
