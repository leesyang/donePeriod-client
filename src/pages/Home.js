import React from 'react';
import { connect } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';
import { Link } from 'react-router-dom';

// ----- components -----
import Notes from './home/Notes';
import NavColumn from './home/NavColumn';
import Feed from './home/Feed';
import UserInfo from './home/UserInfo';

export class Home extends React.Component {
    render () {
        return (
            <div className="home">
                <UserInfo />
                <Feed />
                <NavColumn />
                <Notes />
            </div>
        )
    }
}

export default ProtectedRoute()(connect()(Home));