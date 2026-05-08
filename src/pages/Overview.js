import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

// ----- components -----
import TicketTable from './overview/TicketTable';

export function Overview() {
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

export default ProtectedRoute()(Overview);
