import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import EditFormDescription from './description/EditForm';
import Loader from '../../components/Loader';

// ----- actions -----
import { updateDescriptionInit } from '../../modules/ticket';

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

        if(isEditing){ return (
            <div className="edit-form-container">
                <EditFormDescription />
                <button onClick={this.onCancel}>Cancel</button>
            </div>
            )}

        return (
            <div className="description">
                Description: {description}
                <button onClick={this.onClickEdit}>Edit</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    description: state.ticket.description.text,
    isUpdating: state.ticket.description.isUpdating,
    isEditing: state.ticket.description.isEditing
})

export default connect(mapStateToProps)(Description)