import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
//import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';

// ----- components -----
import TicketTable from './overview/TicketTable';

export class Overview extends React.Component {
    render() {

        return (
            <div className="overview">
                <TicketTable />
            </div>
        )
    }
}

export default ProtectedRoute()(Overview);