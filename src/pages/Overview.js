import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Overview extends React.Component {
    render() {
        return (
            <div className="overview">
                this is where the tickets will go
                <Link to="/issues/12345">Link</Link>
            </div>
        )
    }
}

export default ProtectedRoute()(connect()(Overview));