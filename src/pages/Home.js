import React from 'react';
import { connect } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';

// ----- components -----
import Notes from './home/Notes';
import Feed from './home/Feed';
import UserInfo from './home/UserInfo';

export class Home extends React.Component {
    render () {
        return (
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <UserInfo />
                        </div>
                        <div className="col-4">
                            <Feed />
                        </div>
                        <div className="col-4">
                            <Notes />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProtectedRoute()(connect()(Home));