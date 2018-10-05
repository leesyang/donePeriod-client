import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// ----- utils -----
import {formatDateShort } from '../../../utils/auth'
// ----- css -----
import './FeedTable.css';

export class FeedTable extends React.Component {
    render() {
        const { watching } = this.props;

        const list = watching.map((ticket, index) => {
            const { dueDate, ticketId } = ticket;
            return (
                <tr key={index}>
                    <td data-label="Ticket Id"><Link to={`/issues/${ticketId}`}>{ticketId}</Link></td>
                    <td data-label="Due In">{formatDateShort(dueDate)}</td>
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