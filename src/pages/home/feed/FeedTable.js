import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExternalLink, Trash2 } from 'lucide-react';

// ----- utils -----
import { dateTimer } from '../../../utils/auth'

// ----- actions -----
import { unwatchTicket } from '../../../modules/auth';

// ----- css -----
import './FeedTable.css';

export function FeedTable() {
    const dispatch = useDispatch();
    const watching = useSelector(state => state.auth.currentUser.watching);

    function onDeleteWatch(id) {
        dispatch(unwatchTicket(id));
    }

    const list = watching.map((ticket, index) => {
        const { dueDate, ticketId, _id } = ticket;

        return (
            <tr key={index}>
                <td data-label="Ticket">
                    <Link to={`/issues/${ticketId}`}><ExternalLink size={16} /></Link>
                    <Trash2 className="icon-action" onClick={() => onDeleteWatch(_id)} size={16} />
                </td>
                <td data-label="Due In">{dateTimer(dueDate) < 0? 'Overdue' : `${dateTimer(dueDate)} Days`}</td>
            </tr>
        )
    })

    return (
        <table className="feed-table">
            <thead>
                <tr>
                <th scope="col">Ticket</th>
                <th scope="col">Due In</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

export default FeedTable;
