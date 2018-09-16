import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// ----- components -----
import Loader from '../components/Loader';

// ----- actions -----
import { getTickets } from '../modules/ticketsData';
import { getUsers } from '../modules/users';

export default () => Component => {
    function RequiresLogin(props) {
        const { loggedIn, dataLoaded, usersLoaded, ...passThroughProps } = props;
        
        if(!loggedIn) { return <Redirect to="/login" /> }

        if(!dataLoaded ) { props.dispatch(getTickets()); return <Loader /> }

        if(!usersLoaded) { props.dispatch(getUsers()); return <Loader /> }

        return <Component {...passThroughProps} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    const mapStateToProps = (state, props) => {
        return {
            loggedIn: state.auth.currentUser !== null,
            dataLoaded: state.protectedData.initialGet,
            usersLoaded: state.users.all
        }
};

    return connect(mapStateToProps)(RequiresLogin);
};