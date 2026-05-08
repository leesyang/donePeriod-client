import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ----- components -----
import EditFormDescription from './description/EditForm';
import Loader from '../../components/Loader';

// ----- actions -----
import { updateDescriptionInit } from '../../modules/ticket';

// ----- css -----
import './Description.css';

export function Description() {
    const dispatch = useDispatch();
    const description = useSelector(state => state.ticket.description.text);
    const isUpdating = useSelector(state => state.ticket.description.isUpdating);
    const isEditing = useSelector(state => state.ticket.description.isEditing);

    function onClickEdit() {
        console.log('on click edit');
        dispatch(updateDescriptionInit(true));
    }

    function onCancel() {
        dispatch(updateDescriptionInit(false));
    }

    if(isUpdating) { return <Loader /> }

    let editingForm;

    if(isEditing){ editingForm = (
        <div className="edit-form-container">
            <EditFormDescription onCancel={onCancel}/>
        </div>
        )}

    let descriptionText = (
        <p>
            {description}
            <button className="button-edit" onClick={onClickEdit}>Edit</button>
        </p>
    );

    return (
        <section className="description border-top">
            <header>Description</header>
            {editingForm? editingForm : descriptionText}
        </section>
    )
}

export default Description;
