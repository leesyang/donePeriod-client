import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ----- import actions -----
import { updateInfoInit } from '../../modules/ticket';

// ----- components -----
import EditForm from './info/EditForm';
import Loader from '../../components/Loader';

// ----- css -----
import './Info.css';

export function Info() {
    const dispatch = useDispatch();
    const ticketInfo = useSelector(state => state.ticket.ticketInfo);
    const { type, status, priority, resolution, isEditing, isUpdating } = ticketInfo;

    function onClickEdit() {
        dispatch(updateInfoInit(true));
    }

    function onClickCancel() {
        dispatch(updateInfoInit(false));
    }

    if(isUpdating) {
        return <Loader />
    }

    if(isEditing) {
       return (
            <div className="info-edit-form">
                <EditForm
                    ticketInfo={ticketInfo}
                    onCancel={() => onClickCancel()}
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
            <button className="button-edit" onClick={() => onClickEdit()}>Edit</button>
        </section>
    )
}

export default Info;
