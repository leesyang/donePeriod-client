import React from 'react';

// ----- components -----
import Comments from './activity/Comments';
import WorkLog from './activity/WorkLog';

export default class Activity extends React.Component {
    render () {
        return (
            <div className="activity">
                <Comments />
                <WorkLog />
            </div>
        )
    }
}