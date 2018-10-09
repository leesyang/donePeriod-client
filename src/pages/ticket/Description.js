import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import EditFormDescription from './description/EditForm';
import Loader from '../../components/Loader';

// ----- actions -----
import { updateDescriptionInit } from '../../modules/ticket';

// ----- css -----
import './Description.css';

export class Description extends React.Component {
    constructor(props) {
        super(props);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onClickEdit() {
        console.log('on click edit')
        this.props.dispatch(updateDescriptionInit(true))
    }

    onCancel() {
        this.props.dispatch(updateDescriptionInit(false))
    }

    render () {
        const { isEditing, isUpdating, description  } = this.props;

        if(isUpdating) { return <Loader /> }

        let editingForm;

        if(isEditing){ editingForm = (
            <div className="edit-form-container">
                <EditFormDescription />
                <button onClick={this.onCancel}>Cancel</button>
            </div>
            )}
        
        let descriptionText = (
            <p>
                {description}
                <button className="button-edit" onClick={this.onClickEdit}>Edit</button>
            </p>
        );

        return (
            <section className="description border-top">
                <header>Description</header>
                {editingForm? editingForm  : descriptionText}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    description: state.ticket.description.text,
    isUpdating: state.ticket.description.isUpdating,
    isEditing: state.ticket.description.isEditing
})

export default connect(mapStateToProps)(Description)