import React from 'react';
import { connect } from 'react-redux';
import { AMZ_S3_URL } from '../../config';
import Ionicon from 'react-ionicons';

// ----- components -----
import UploadPictureForm  from './userInfo/UploadForm';
import Loader from '../../components/Loader';
import AssignedList from './userInfo/AssignedList';

// ----- actions -----
import { updateUserPhoto } from '../../modules/auth';

// ----- css -----
import './UserInfo.css'

export class UserInfo extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onClick() {
        console.log('upload photo');
        this.props.dispatch(updateUserPhoto(true))
    }

    onCancel() {
        this.props.dispatch(updateUserPhoto(false))
    }

    render() {
        const { fullName, profilePicture, isEditing, isUpdating, assigned } = this.props;

        if(isUpdating) {
            return (
                <Loader />
            )
        }

        if(isEditing){
            return (
                <div className="user-info">
                    <UploadPictureForm />
                    <button onClick={this.onCancel}>Cancel</button>
                </div>
            )
        }

        return (
            <div className="user-info">
                <img src={AMZ_S3_URL+profilePicture} className="user-img"></img>
                <Ionicon icon="md-create" className="pen" onClick={this.onClick} role="button"/>
                <a className="user-fullname">Hi, {fullName}</a>
                <h3>Assigned Tickets: </h3>
                <AssignedList watching={assigned} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { firstName,
        lastName,
        profilePicture,
        isEditing,
        photoUpdateLoading,
        assigned,
    } = state.auth.currentUser;

    return {
        fullName: firstName+' '+lastName,
        profilePicture: profilePicture,
        isEditing: isEditing,
        isUpdating: photoUpdateLoading,
        assigned: assigned
    }
}

export default connect(mapStateToProps)(UserInfo)