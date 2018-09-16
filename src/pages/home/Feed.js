import React from 'react';
import { connect } from 'react-redux';

// ----- component -----
import Entry from './feed/Entry';

export class Feed extends React.Component {
    render() {
        return (
            <div className="feed">
                <Entry />
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