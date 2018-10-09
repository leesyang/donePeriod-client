import React from 'react';
import { connect } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';
import { Link } from 'react-router-dom';

// ----- components -----
import Activty from './ticket/Activity';
import Attachments from './ticket/Attachements';
import Description from './ticket/Description';
import Info from './ticket/Info';
import InfoSideBar from './ticket/InfoSideBar';

// ----- actions -----
import { loadTicket } from '../modules/ticket';
import { updateTicketfromReducer } from '../modules/ticketsData';

export class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(loadTicket(this.props.ticketId))
    }

    componentWillUnmount() {
        const { isModified, dispatch } = this.props;
        isModified? dispatch(updateTicketfromReducer()) : null;
    }

    render() {
        const { isLoaded, dataLoaded } = this.props;

        if(!dataLoaded) {
            return <div>Loading</div>
        }

        if(isLoaded){
            return (
                <div className="ticket container">
                    <h1>Title</h1>
                    <div className="ticket-nav">
                        <Link to="/overview">Return to Overview</Link>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <Info />
                            <Description/>
                            <Attachments />
                            <Activty />
                        </div>
                        <div className="col-3">
                            <InfoSideBar />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div>Ticket Failed to Load</div>
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        dataLoaded: state.protectedData.initialGet,
        isLoaded: state.ticket.isLoaded,
        ticketId: ownProps.match.params.ticketId,
        isModified: state.ticket.isModified
    }
}

export default ProtectedRoute()(connect(mapStateToProps)(Ticket));