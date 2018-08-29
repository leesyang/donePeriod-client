import React from 'react';

export default class Info extends React.Component {
    render () {
        return (
            <div className="ticket-info row">
                <div className="column">Type:</div>
                <div className="column">Status:</div>
                <div className="column">Priority:</div>
                <div className="column">Resolution:</div>
            </div>
        )
    }
}