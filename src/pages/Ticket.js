import React from 'react';
import { connect } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';
import { Link } from 'react-router-dom';
import Ionicon from 'react-ionicons';

// ----- components -----
import Activty from './ticket/Activity';
import Attachments from './ticket/Attachements';
import Description from './ticket/Description';
import Info from './ticket/Info';
import InfoSideBar from './ticket/InfoSideBar';

// ----- css -----
import './Ticket.css';

// ----- actions -----
import { loadTicket } from '../modules/ticket';
import { updateTicketfromReducer } from '../modules/ticketsData';

export class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(loadTicket(this.props.ticketId))
        this.scrollToComments = this.scrollToComments.bind(this);
    }

    componentWillUnmount() {
        const { isModified, dispatch } = this.props;
        isModified? dispatch(updateTicketfromReducer()) : null;
    }

    scrollToComments() {
        let comments = document.getElementById('activity');
        comments.scrollIntoView({behavior: "smooth"});
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
                        <button><Link to="/overview">Overview</Link></button>
                        <button onClick={this.scrollToComments}><Ionicon icon="md-text" fontSize="1em" color="#ffffff" className="nav-icon" />Comment</button>
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