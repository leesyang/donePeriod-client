import React from 'react';

// ----- component -----
import FeedTable from './feed/FeedTable';

// ----- css -----
import './Feed.css'

// ----- images -----
import homebanner from '../../images/homebanner.jpg';

export function Feed() {
    return (
        <div className="feed">
            <img src={homebanner} alt="home banner" className="homebanner-img"></img>
            <p>Stay on track. Currently watching tickets:</p>
            <FeedTable />
        </div>
    )
}

export default Feed;
