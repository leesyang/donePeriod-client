import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// ----- components -----
import UserIcon from '../../components/UserIcon';

// ----- css -----
import './TicketTable.css'

// ----- util functions -----
import { generateFullName, formatDate } from '../../utils/tickets';

export class TicketTable extends React.Component {
    render() {
        const { tickets } = this.props;

        let header = (
            <div className="divTableRow">
                <div className="divTableCell">Id</div>
                <div className="divTableCell">Description</div>
                <div className="divTableCell">Reporter</div>
                <div className="divTableCell">Assigned To</div>
                <div className="divTableCell">Due Date</div>
                <div className="divTableCell">Status</div>
            </div>
        )

        let rows = tickets.map((ticket, index) => {
            let path = `/issues/${ticket.ticketId}`;
            return (
                <div className="divTableRow" key={ticket.ticketId}>
                    <div className="divTableCell"><Link to={path}>{ticket.ticketId}</Link></div>
                    <div className="divTableCell">{ticket.description.text}</div>
                    <div className="divTableCell">{generateFullName(ticket.reporter)}</div>
                    <div className="divTableCell">{generateFullName(ticket.assignee)}</div>
                    <div className="divTableCell">{formatDate(ticket.dueDate)}</div>
                    <div className="divTableCell">{ticket.ticketInfo.status}</div>
                </div>
            )
        })

        return (
            <div className="divTable">
                <div className="divTableBody">
                    {header}
                    {rows}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tickets: state.protectedData.tickets
    }
}

export default connect(mapStateToProps)(TicketTable);