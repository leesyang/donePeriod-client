import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import WorkLogForm from './workLog/WorkLogForm';
import LoaderSm from '../../../components/LoaderSm';
import Comment from '../activity/comments/Comment';

export class WorkLog extends React.Component {
    render () {
        const { ticketId, uploading, worklog } = this.props;
        
        const workLogForm = uploading? <LoaderSm /> : <WorkLogForm ticketId={ticketId} />

        const worklogEntries = worklog? worklog.map((log, index) => (
            <Comment comment={log} key={index} ticketId={ticketId}/>
        )) : undefined;

        return (
            <div className="worklog-container">
                <h2>Work Log</h2>
                {worklogEntries}
                {workLogForm}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ticketId: state.ticket.ticketId,
        uploading: state.ticket.workloguploading,
        worklog: state.ticket.worklog
    }
}

export default connect(mapStateToProps)(WorkLog)