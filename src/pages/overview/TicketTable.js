import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

import { ticketOpt } from '../../components/forms/Consts';

// ----- css -----
import './TicketTable.css'

// ----- util functions -----
import { generateFullName, formatDate } from '../../utils/tickets';

export function TicketTable() {
    const tickets = useSelector(state => state.protectedData.tickets);

    const genStatusIcon = (status) => {
        let color;

        ticketOpt.status.forEach(ticketStatus => {
            if(status === ticketStatus.text) {
               color = ticketStatus.iconColor
            }
            if(!color) { color = "#091E42"}
        })

        return <Info color={color} size={16} />
    }

    const header = (
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Reporter</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Due Date</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
    )

    const list = tickets.map((ticket, index) => {
        const {
            ticketId,
            reporter,
            assignee,
            dueDate,
            ticketInfo,
            title
            } = ticket;

        let path = `/issues/${ticket.ticketId}`;

        return (
            <tr key={index}>
                <td data-label="Ticket Id"><Link to={path}>{ticketId}</Link></td>
                <td data-label="Title">{title}</td>
                <td data-label="Reporter">{generateFullName(reporter)}</td>
                <td data-label="Assigned To">{generateFullName(assignee)}</td>
                <td data-label="Due Date">{formatDate(dueDate)}</td>
                <td data-label="Status">{genStatusIcon(ticketInfo.status)}{ticketInfo.status}</td>
            </tr>
        )
    })

    return (
        <table className="overview-table">
            {header}
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

export default TicketTable;
