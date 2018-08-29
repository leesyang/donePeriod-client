import React from 'react';

// ----- component -----
import Entry from './feed/Entry';

export default class Feed extends React.Component {
    render() {
        return (
            <div className="feed">
                <Entry />
            </div>
        )
    }
}