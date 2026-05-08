import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

// ----- utils -----
import { dateTimer } from '../../../utils/auth';

// ----- css -----
import './AssignedList.css';

export function AssignedList({ watching }) {
    const list = watching.map((ticket, index) => {
        const { dueDate, ticketId } = ticket;

        let color;
        const dueIn = dateTimer(dueDate);
        if(dueIn <= 0) { color ='#FF5630'}
        if(dueIn < 7) { color ='#FF991F'}
        if(dueIn > 7) { color='#36B37E'}

        return (
            <li key={index}>
                <Link to={`/issues/${ticketId}`}><ExternalLink color={color} size={16} /></Link>
            </li>
        )
    });

    return (
        <ul className="ticket-list">
            {list}
        </ul>
    )
}

export default AssignedList;
