import React from 'react';
import { connect } from 'react-redux';

// ----- import actions -----
import { updateInfoInit } from '../../modules/ticket';

// ----- components -----
import EditForm from './info/EditForm';
import Loader from '../../components/Loader';

// ----- css -----
import './Info.css';

export class Info extends React.Component {
    onClickEdit () {
        this.props.dispatch(updateInfoInit(true))
    }

    onClickCancel() {
        this.props.dispatch(updateInfoInit(false))
    }

    render () {
        const { type, status, priority, resolution, isEditing, isUpdating } = this.props.ticketInfo;

        if(isUpdating) {
            return <Loader />
        }

        if(isEditing) { 
           return (
                <div className="info-edit-form">
                    <EditForm ticketInfo={this.props.ticketInfo} />
                    <button onClick={() => this.onClickCancel()}>Cancel</button>
                </div>
            )
        }

        return (
            <section className="ticket-info">
                <button className="button-edit" onClick={() => this.onClickEdit()}>Edit Fields</button>
                <ul className="row border-top">
                    <li className="col-6">
                        <b>Type: </b>{type}
                    </li>
                    <li className="col-6">
                        <b>Status: </b>{status}
                    </li>
                </ul>
                <ul className="row">
                    <li className="col-6">
                        <b>Priority: </b>{priority}
                    </li>
                    <li className="col-6">
                        <b>Resolution: </b>{resolution}
                    </li>
                </ul>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    ticketInfo: state.ticket.ticketInfo
})

export default connect(mapStateToProps)(Info);