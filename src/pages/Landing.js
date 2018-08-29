import React from 'react';

// ----- components -----
import TopNav from './landing/TopNav'

export default class Landing extends React.Component {
    render () {
        return (
            <div className="landing">
                <TopNav />
                <a>Landing Page</a>
            </div>
        )
    }
}