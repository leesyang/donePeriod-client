import React from 'react';
import { connect } from 'react-redux';

// ----- component -----
import Entry from './feed/Entry';

// ----- css -----
import './feed/Entry.css'

export class Feed extends React.Component {
    render() {
        const { currentWatch } = this.props;

        const entries = currentWatch.map((entry, index) => <Entry key={index} entry={entry} />)

        return (
            <div className="feed">
                <h2>Watching Issues:</h2>
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