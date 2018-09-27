import React from 'react';
import { connect } from 'react-redux';

// ----- component -----
import Entry from './feed/Entry';

// ----- actions -----
import { unwatchTicket } from '../../modules/auth';

// ----- css -----
import './feed/Entry.css'

export class Feed extends React.Component {
    onUnWatch(ticket_Id) {
        this.props.dispatch(unwatchTicket(ticket_Id))
    }

    render() {
        const { currentWatch } = this.props;

        const entries = currentWatch.map((entry, index) => <Entry key={index} entry={entry} onClick={(ticket_Id) => this.onUnWatch(ticket_Id)}/>)

        return (
            <div className="feed">
                <h3>Watching Issues:</h3>
                {entries}
            </div>
        )
    }
}

const mapStateToPropse = state => {
    return {
        currentWatch: state.auth.currentUser.watching
    }
}

export default connect(mapStateToPropse)(Feed)