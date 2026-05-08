import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';
import { Link, useParams } from 'react-router-dom';

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

export function Ticket() {
    const dispatch = useDispatch();
    const { ticketId } = useParams();
    const dueDate = useSelector(state => state.ticket.dueDate);
    const title = useSelector(state => state.ticket.title);
    const dataLoaded = useSelector(state => state.protectedData.initialGet);
    const isLoaded = useSelector(state => state.ticket.isLoaded);
    const isModified = useSelector(state => state.ticket.isModified);

    useEffect(() => {
        dispatch(loadTicket(ticketId));
        return () => {
            if(isModified) { dispatch(updateTicketfromReducer()); }
        };
    }, []);

    function scrollToComments() {
        document.getElementById('activity').scrollIntoView({behavior: "smooth"});
    }

    function scrollToInfo() {
        document.getElementById('info-sidebar').scrollIntoView({behavior: "smooth"});
    }

    if(!dataLoaded) {
        return <div>Loading</div>
    }

    if(isLoaded){
        return (
            <div className="ticket container">
                <h1>{title}</h1>
                <div className="dueDate">Due on {formatDateShort(dueDate)}</div>
                <nav className="ticket-nav">
                    <button><Link to="/issues">Overview</Link></button>
                    <button onClick={scrollToComments}>Comment</button>
                    <button onClick={scrollToInfo}>Info</button>
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

export default ProtectedRoute()(Ticket);
