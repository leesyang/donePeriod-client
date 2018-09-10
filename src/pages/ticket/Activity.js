import React from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = state =>({
    comments: state.ticket.activty.comments,
    worklog: state.ticket.activity.worklog
})