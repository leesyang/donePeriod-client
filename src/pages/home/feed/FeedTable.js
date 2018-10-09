import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Ionicon from 'react-ionicons';

// ----- utils -----
import {formatDateShort, dateTimer } from '../../../utils/auth'

// ----- actions -----
import { unwatchTicket } from '../../../modules/auth';

// ----- css -----
import './FeedTable.css';

export class FeedTable extends React.Component {
    onDeleteWatch(id) {
        console.log(id)
        const { dispatch } = this.props;
        dispatch(unwatchTicket(id));
    }

    render() {
        const { watching } = this.props;

        const list = watching.map((ticket, index) => {
            const { dueDate, ticketId, _id } = ticket;

            return (
                <tr key={index}>
                    <td data-label="Ticket">
                        <Link to={`/issues/${ticketId}`}><Ionicon icon="md-open"/></Link>
                        <Ionicon icon="md-close" onClick={() => this.onDeleteWatch(_id)} />
                    </td>
                    <td data-label="Due In">{dateTimer(dueDate) < 0? 'Overdue' : `${dateTimer(dueDate)} Days`}</td>
                </tr>
            )
        })        

        return (
            <table>
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
}

const mapStateToProps =state => {
    return {
        watching: state.auth.currentUser.watching
    }
}

export default connect(mapStateToProps)(FeedTable);