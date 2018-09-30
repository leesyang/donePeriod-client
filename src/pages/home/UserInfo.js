import React from 'react';
import { connect } from 'react-redux';
import { USER_PHOTO_URL } from '../../config';

// ----- components -----
import UploadPictureForm  from './userInfo/UploadForm';
import Loader from '../../components/Loader';

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
        const { fullName, profilePicture, isEditing, isUpdating } = this.props;

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
                <img src={USER_PHOTO_URL+profilePicture} className="user-img"></img>
                <a className="user-fullname">{fullName}</a>
                <a href="#" onClick={this.onClick}>Change Profile Picture</a>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    const { firstName, lastName, profilePicture, isEditing, photoUpdateLoading } = state.auth.currentUser;

    return {
        fullName: firstName+' '+lastName,
        profilePicture: profilePicture,
        isEditing: isEditing,
        isUpdating: photoUpdateLoading
    }
}

export default connect(mapStateToProps)(UserInfo)