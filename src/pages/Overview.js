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
                <div className="row">
                    <div className="col-12">
                        <h2>Current tickets:</h2>
                        <TicketTable />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProtectedRoute()(Overview);