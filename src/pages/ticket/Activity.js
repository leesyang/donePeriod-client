import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import WorkLog from './activity/WorkLog';

export class Activity extends React.Component {
    render () {
        return (
            <div className="activity">
                <WorkLog />
            </div>
        )
    }
}

const mapStateToProps = state =>({
    comments: state.ticket.activty.comments,
    worklog: state.ticket.activity.worklog
})

export default connect(mapStateToProps)(Activity)