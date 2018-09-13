import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
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

export class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(loadTicket(this.props.ticketId))
    }

    render() {
        console.log(store.getState());
        const { isLoaded, dataLoaded } = this.props;

        if(!dataLoaded) {
            return <div>Loading</div>
        }

        if(isLoaded){
            return (
                <div className="ticket">
                    <h1>Title</h1>
                    <div className="ticket-nav">
                        <Link to="/overview">Return to Overview</Link>
                    </div>
                    <Info />
                    <Description/>
                    <Attachments />
                    <Activty />
                    <InfoSideBar />
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
        ticketId: ownProps.match.params.ticketId
    }
}

export default ProtectedRoute()(connect(mapStateToProps)(Ticket));