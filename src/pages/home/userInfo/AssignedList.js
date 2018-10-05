import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// ----- utils -----
import { formatDateShort } from '../../../utils/auth';

// ----- css -----
import './AssignedList.css';

export class AssignedList extends React.Component {
    render() {
        const { watching } = this.props;

        const trimmedDescript = (description) => {
            return description.slice(0, 20)+'...'
        }

        const list = watching.map((ticket, index) => {
            const { dueDate, ticketId, description } = ticket;

            return (
                <tr key={index}>
                    <td data-label="Ticket Id"><Link to={`/issues/${ticketId}`}>{ticketId}</Link></td>
                    <td data-label="DueDate">{formatDateShort(dueDate)}</td>                    
                    <td data-label="Description">{trimmedDescript(description.text)}</td>
                </tr>
            )
        })        

        return (
            <table>
                <thead>
                    <tr>
                    <th scope="col">Ticket</th>
                    <th scope="col">Due In</th>
                    <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps =state => {
    return {
        assigned: state.auth.currentUser.assigned
    }
}

export default connect(mapStateToProps)(AssignedList);