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
                    <EditForm
                        ticketInfo={this.props.ticketInfo}
                        onCancel={() => this.onClickCancel()}
                    />
                </div>
            )
        }

        return (
            <section className="ticket-info">
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
                <button className="button-edit" onClick={() => this.onClickEdit()}>Edit</button>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    ticketInfo: state.ticket.ticketInfo
})

export default connect(mapStateToProps)(Info);