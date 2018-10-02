import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import WorkLog from './activity/WorkLog';
import Comments from './activity/Comments';

export class Activity extends React.Component {
    render () {
        return (
            <div className="activity">
                <h2>Activity</h2>
                <Comments />
                <WorkLog />
            </div>
        )
    }
}

const mapStateToProps = state =>({
})

export default connect(mapStateToProps)(Activity)