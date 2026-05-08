import React from 'react';
import { useSelector } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';
import { Link } from 'react-router-dom';

// ----- components -----
import Form from './newTicket/Form';
import Loader from '../components/Loader';

export function NewTicket() {
    const isLoading = useSelector(state => state.protectedData.isLoading);
    const users = useSelector(state => state.users.all);

    if(isLoading) { return <Loader /> }

    return (
        <div className="new-ticket-container container">
            <h2>Submit New Ticket</h2>
            <Form users={users}/>
            <div className="row">
                <div className="col-12">
                    <Link to="/home">
                        <button className="link-back">Back to Home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProtectedRoute()(NewTicket);
