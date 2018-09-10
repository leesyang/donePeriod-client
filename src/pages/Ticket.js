import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import Activty from './ticket/Activity';
import Attachments from './ticket/Attachements';
import Description from './ticket/Description';
import Info from './ticket/Info';
import InfoSideBar from './ticket/InfoSideBar';

export class Ticket extends React.Component {
    render() {
        const { ticket } = this.props;
        return (
            <div className="ticket">
                <h1>Title</h1>
                <Info />
                <Description/>
                <Attachments />
                <Activty />
                <InfoSideBar />
            </div>
        )
    }
}

const mapStateToProps = state => ({ meta: state.ticket.meta })

export default connect(mapStateToProps)(Ticket)