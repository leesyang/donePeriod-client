import React from 'react';
import { useSelector } from 'react-redux';

// ----- components -----
import WorkLogForm from './workLog/WorkLogForm';
import LoaderSm from '../../../components/LoaderSm';
import Comment from '../activity/comments/Comment';

export function WorkLog() {
    const ticketId = useSelector(state => state.ticket.ticketId);
    const uploading = useSelector(state => state.ticket.workloguploading);
    const worklog = useSelector(state => state.ticket.worklog);

    const workLogForm = uploading? <LoaderSm /> : <WorkLogForm />

    const worklogEntries = worklog? worklog.map((log, index) => (
        <Comment comment={log} key={index} ticketId={ticketId}/>
    )) : undefined;

    return (
        <div className="worklog-container">
            {worklogEntries}
            {workLogForm}
        </div>
    )
}

export default WorkLog;
