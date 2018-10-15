import React from 'react';
import { connect } from 'react-redux';

// ----- component -----
import FeedTable from './feed/FeedTable';

// ----- actions -----
import { unwatchTicket } from '../../modules/auth';

// ----- css -----
import './Feed.css'

// ----- images -----
import homebanner from '../../images/homebanner.jpg';

export class Feed extends React.Component {
    onUnWatch(ticket_Id) {
        this.props.dispatch(unwatchTicket(ticket_Id))
    }

    render() {
        return (
            <div className="feed">
                <img src={homebanner} alt="home banner" className="homebanner-img"></img>
                <p>Stay on track. Currently watching tickets:</p>
                <FeedTable />
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