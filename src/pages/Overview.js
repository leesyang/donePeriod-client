import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { connect } from 'react-redux';

export class Overview extends React.Component {
    render() {
        return (
            <div className="overview">
                this is where the tickets will go
            </div>
        )
    }
}

export default ProtectedRoute()(connect()(Overview));