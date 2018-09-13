import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchProtectedData } from '../modules/protectedData';

export default () => Component => {
    function RequiresData(props) {
        const { loggedIn, hasData, data, ...passThroughProps } = props;
        console.log(hasData)
        console.log(data);
        if(!hasData){
            fetchProtectedData();
        }
        return <Component {...passThroughProps} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresData.displayName = `RequiresData(${displayName})`;

    const mapStateToProps = (state, props) => ({
        loggedIn: state.auth.currentUser !== null,
        hasData: state.protectedData.tickets !== undefined,
        data: state.protectedData.tickets
    });

    return connect(mapStateToProps)(RequiresData);
};