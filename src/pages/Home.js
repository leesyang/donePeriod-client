import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { Link } from 'react-router-dom';

// ----- modules -----
import { fetchProtectedData } from '../modules/protectedData';

// ----- components -----
import Notes from './home/Notes';
import NavColumn from './home/NavColumn';
import Feed from './home/Feed';
import Loader from '../components/Loader';

export class Home extends React.Component {
    constructor (props) {
        super(props);
        this.props.dispatch(fetchProtectedData())
    }

    render () {
        const { error, loadingData, dataLoaded } = this.props;

        if(error) {
            return <div>there was an error</div>
        }

        if(!dataLoaded){
            return <div>Loading Data</div>
        }

        if(loadingData) {
            return <Loader />
        }

        //console.log(this.props.tickets);
        return (
            <div className="home">
                <Feed />
                <NavColumn />
                <Notes />
                <Link to="/nav">Link</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        loggedIn: state.auth.currentUser !== null,
        dataLoaded: state.protectedData.initialGet,
        loadingData: state.protectedData.isLoading,
        tickets: state.protectedData.tickets,
        error: state.protectedData.error,
        }
};

export default ProtectedRoute()(connect(mapStateToProps)(Home));