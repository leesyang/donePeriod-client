import React from 'react';
import { connect } from 'react-redux';
import { updateDescriptionInit } from '../../modules/ticket';

// ----- components -----
import EditFormDescription from './description/EditForm';
import Loader from '../../components/Loader';

export class Description extends React.Component {
    constructor(props) {
        super(props);
        this.onClickEdit = this.onClickEdit.bind(this);
    }

    onClickEdit() {
        this.props.dispatch(updateDescriptionInit())
    }

    render () {
        const { isEditing, isUpdating, description  } = this.props;

        if(isUpdating) {
            return <Loader />
        }

        if(isEditing){ 
            return <EditFormDescription />
        }

        return (
            <div className="description">
                Description: {description}
                <button onClick={this.onClickEdit}>click</button>
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