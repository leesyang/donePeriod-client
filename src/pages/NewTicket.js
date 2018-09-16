import React from 'react';
import { connect } from 'react-redux'
import ProtectedRoute from '../components/ProtectedRoute';
import { Link } from 'react-router-dom';

// ----- components -----
import Form from './newTicket/Form';
import Loader from '../components/Loader';

export class NewTicket extends React.Component {
    render() {
        const { isLoading, users } = this.props;

        if(isLoading) {
            <Loader />
        }

        return (
            <div className="new-ticket-container">
                <h2>Submit New Ticket</h2>
                <Form users={users}/>
                <Link to="/home">
                    <button>Back to Home</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.protectedData.isLoading,
        users: state.users.all,
    }
}

export default ProtectedRoute()(connect(mapStateToProps)(NewTicket));