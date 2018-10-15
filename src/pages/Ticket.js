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

// ----- util -----
import { formatDateShort } from '../utils/auth';

// ----- css -----
import './Ticket.css';

export class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(loadTicket(this.props.ticketId))
        this.scrollToComments = this.scrollToComments.bind(this);
    }

    componentWillUnmount() {
        const { isModified, dispatch } = this.props;
        if(isModified) {  dispatch(updateTicketfromReducer()) };
    }

    scrollToComments() {
        document.getElementById('activity').scrollIntoView({behavior: "smooth"});
    }
    scrollToInfo() {
        document.getElementById('info-sidebar').scrollIntoView({behavior: "smooth"});
    }

    render() {
        const { isLoaded, dataLoaded } = this.props;

        if(!dataLoaded) {
            return <div>Loading</div>
        }

        if(isLoaded){
            const { title, dueDate } = this.props;
            
            return (
                <div className="ticket container">
                    <h1>{title}</h1>
                    <div className="dueDate">Due on {formatDateShort(dueDate)}</div>
                    <nav className="ticket-nav">
                        <button><Link to="/issues">Overview</Link></button>
                        <button onClick={this.scrollToComments}>Comment</button>
                        <button onClick={this.scrollToInfo}>Info</button>
                    </nav>
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
        dueDate: state.ticket.dueDate,
        title: state.ticket.title,
        dataLoaded: state.protectedData.initialGet,
        isLoaded: state.ticket.isLoaded,
        ticketId: ownProps.match.params.ticketId,
        isModified: state.ticket.isModified
    }
}

export default ProtectedRoute()(connect(mapStateToProps)(Ticket));