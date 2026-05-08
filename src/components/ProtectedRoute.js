import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

// ----- components -----
import Loader from '../components/Loader';

// ----- actions -----
import { getTickets } from '../modules/ticketsData';
import { getUsers } from '../modules/users';

export default () => Component => {
    function RequiresLogin(props) {
        const dispatch = useDispatch();
        const loggedIn = useSelector(state => state.auth.currentUser !== null);
        const dataLoaded = useSelector(state => state.protectedData.initialGet);
        const usersLoaded = useSelector(state => state.users.all);

        if(!loggedIn) { return <Navigate to="/" replace /> }

        if(!dataLoaded) { dispatch(getTickets()); return <Loader /> }

        if(loggedIn && !usersLoaded) { dispatch(getUsers()); return <Loader /> }

        return <Component {...props} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    return RequiresLogin;
};
