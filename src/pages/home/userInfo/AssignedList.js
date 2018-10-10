import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Ionicon from 'react-ionicons';

// ----- utils -----
import { dateTimer } from '../../../utils/auth';

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

            let color;
            const dueIn = dateTimer(dueDate);
            if(dueIn <= 0) { color ='#FF5630'}
            if(dueIn < 7) { color ='#FF991F'}
            if(dueIn > 7) { color='#36B37E'}

            return (
                <li key={index}>
                    <Link to={`/issues/${ticketId}`}><Ionicon icon="md-open" color={color}/></Link>
                </li>
            )
        });


        return (
            <ul className="ticket-list">
                {list}
            </ul>
        )
    }
}

const mapStateToProps =state => {
    return {
        assigned: state.auth.currentUser.assigned
    }
}

/*
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
                        <td data-label="Due Date">{formatDateShort(dueDate)}</td>                    
                        <td data-label="Description">{description.text}</td>
                    </tr>
            )
        });


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
*/
export default connect(mapStateToProps)(AssignedList);