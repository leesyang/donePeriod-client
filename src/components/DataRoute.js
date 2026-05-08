import React from 'react';
import { useSelector } from 'react-redux';
import { fetchProtectedData } from '../modules/protectedData';

export default () => Component => {
    function RequiresData(props) {
        const loggedIn = useSelector(state => state.auth.currentUser !== null);
        const hasData = useSelector(state => state.protectedData.tickets !== undefined);
        const data = useSelector(state => state.protectedData.tickets);

        if(!hasData){
            fetchProtectedData();
        }
        return <Component {...props} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresData.displayName = `RequiresData(${displayName})`;

    return RequiresData;
};
