import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// ----- components -----
import Notes from './home/Notes';
import NavColumn from './home/NavColumn';
import Feed from './home/Feed';

export class Home extends React.Component {
    render () {
            return (
                <div className="home">
                    <Feed />
                    <NavColumn />
                    <Notes />
                </div>
            )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default ProtectedRoute()(connect(mapStateToProps)(Home));