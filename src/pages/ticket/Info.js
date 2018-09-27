import React from 'react';
import { connect } from 'react-redux';

// ----- import actions -----
import { updateInfoInit } from '../../modules/ticket';

// ----- components -----
import EditForm from './info/EditForm';
import Loader from '../../components/Loader';

export class Info extends React.Component {
    onClickEdit () {
        this.props.dispatch(updateInfoInit(true))
    }

    onClickCancel() {
        this.props.dispatch(updateInfoInit(false))
    }

    render () {
        const { type, status, priority, resolution, isEditing, isUpdating } = this.props;

        if(isUpdating) {
            return <Loader />
        }

        if(isEditing) { 
           return (
                <div className="info-edit-form">
                    <EditForm />
                    <button onClick={() => this.onClickCancel()}>Cancel</button>
                </div>
            )
        }

        return (
            <div className="ticket-info">
                <button onClick={() => this.onClickEdit()}>Edit Fields</button>
                <div className="column">Type: {type}</div>
                <div className="column">Status: {status}</div>
                <div className="column">Priority: {priority}</div>
                <div className="column">Resolution: {resolution}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.ticket.ticketInfo
})

export default connect(mapStateToProps)(Info);