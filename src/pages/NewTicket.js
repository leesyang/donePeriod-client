import React from 'react';
import { connect } from 'react-redux'
import ProtectedRoute from '../components/ProtectedRoute';
import { Link } from 'react-router-dom';

// ----- components -----
import Form from './newTicket/Form';

export class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel() {
        console.log('clicked cancel');
    }

    render() {
        return (
            <div className="new-ticket-container">
                <h2>Submit New Ticket</h2>
                <Form />
                <Link to="/home">
                    <button>Back to Home</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {}
}

export default ProtectedRoute()(connect(mapStateToProps)(NewTicket));