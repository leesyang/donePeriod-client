import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import WorkLog from './activity/WorkLog';
import Comments from './activity/Comments';

// ----- actions -----
import { changeActView } from '../../modules/ticket';

// ----- css -----
import './Activity.css';

export class Activity extends React.Component {

    onClickNav(view) {
        this.props.dispatch(changeActView(view))
    }

    render () {
        console.log(this.props.activityView)

        const { activityView } = this.props;

        const classModifer = activityView === 'comments'? 'button-nav selected': 'button-nav';
        const classModifer2 = activityView === 'worklog'? 'button-nav selected': 'button-nav';

        const currentView = activityView === 'comments'? <Comments /> : <WorkLog />

        return (
            <section className="activity" id="activity">
                <nav>
                    <button className={classModifer} onClick={() => this.onClickNav('comments')}>Comments</button>
                    <button className={classModifer2} onClick={() => this.onClickNav('worklog')}>Work Log</button>
                </nav>
                {currentView}
            </section>
        )
    }
}

const mapStateToProps = state =>({
    activityView: state.ticket.activityView
})

export default connect(mapStateToProps)(Activity)