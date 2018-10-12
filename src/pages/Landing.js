import React from 'react';

// ----- components -----
import TopNav from './landing/TopNav'
import LoginForm from './login/Form';

// ----- images -----
import homeDash from '../images/home-dash.png';
import homeDashFeed from '../images/home-dash-feed.png';
import ticketImg from '../images/ticket.PNG';

// ----- css -----
import './Landing.css';

export default class Landing extends React.Component {

    render () {
        const formContainer = (
            <div className="landing-container l-section1">
                <h1>donePeriod</h1>
                <p>Clean & Simple. Keep track of your team's tasks so that things get done.</p>
            </div>
        );
        
        return (
            <div className="landing">
                <TopNav />
                <div className="login-container">
                    <p>Login</p>
                    <LoginForm />
                </div>
                <div className="landing-container l-section2">
                <img src={homeDash}></img>
                <img src={homeDashFeed}></img>
                <p>a no-frills approach to the dashboard. see just what you need to see.</p>
            </div>
            <div className="landing-container l-section2 l-section3 ">
                <p>tasks that make sense</p>
                <img src={ticketImg}></img>
                <p>easily see progress</p>
            </div>
            <div className="landing-container l-section4">
                <p>© Copyright 2018. All rights reserved.</p>
            </div>
            </div>
        )
    }
}

/* render () {
    return (
        <div className="landing">
            <TopNav />
            <div className="landing-container l-section1">
                <h1>donePeriod</h1>
                <p>Clean & Simple. Keep track of your team's tasks so that things get done.</p>
            </div>
            <div className="landing-container l-section2">
                <img src={homeDash}></img>
                <img src={homeDashFeed}></img>
                <p>a no-frills approach to the dashboard. see just what you need to see.</p>
            </div>
            <div className="landing-container l-section2 l-section3 ">
                <p>tasks that make sense</p>
                <img src={ticketImg}></img>
                <p>easily see progress</p>
            </div>
            <div className="landing-container l-section4">
                <p>© Copyright 2018. All rights reserved.</p>
            </div>
        </div>
    )
} */