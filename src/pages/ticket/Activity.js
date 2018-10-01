import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import WorkLog from './activity/WorkLog';
import Comments from './activity/Comments';
import WorkLogForm from './activity/WorkLogForm';

export class Activity extends React.Component {
    render () {
        return (
            <div className="activity">
                <h1>Activity</h1>
                <WorkLog />
                <Comments />
                <WorkLogForm />
            </div>
        )
    }
}

const mapStateToProps = state =>({
})

export default connect(mapStateToProps)(Activity)