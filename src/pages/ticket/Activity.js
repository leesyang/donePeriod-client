import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ----- components -----
import WorkLog from './activity/WorkLog';
import Comments from './activity/Comments';

// ----- actions -----
import { changeActView } from '../../modules/ticket';

// ----- css -----
import './Activity.css';

export function Activity() {
    const dispatch = useDispatch();
    const activityView = useSelector(state => state.ticket.activityView);

    function onClickNav(view) {
        dispatch(changeActView(view));
    }

    const classModifer = activityView === 'comments'? 'button-nav selected': 'button-nav';
    const classModifer2 = activityView === 'worklog'? 'button-nav selected': 'button-nav';

    const currentView = activityView === 'comments'? <Comments /> : <WorkLog />

    return (
        <section className="activity" id="activity">
            <nav>
                <button className={classModifer} onClick={() => onClickNav('comments')}>Comments</button>
                <button className={classModifer2} onClick={() => onClickNav('worklog')}>Work Log</button>
            </nav>
            {currentView}
        </section>
    )
}

export default Activity;
