import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AMZ_S3_URL } from '../../config';
import { Pencil, ExternalLink } from 'lucide-react';

// ----- components -----
import UploadPictureForm from './userInfo/UploadForm';
import Loader from '../../components/Loader';
import AssignedList from './userInfo/AssignedList';

// ----- actions -----
import { updateUserPhoto } from '../../modules/auth';

// ----- css -----
import './UserInfo.css'

export function UserInfo() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);
    const { firstName, lastName, profilePicture, isEditing, photoUpdateLoading, assigned } = currentUser;
    const fullName = firstName + ' ' + lastName;
    const isUpdating = photoUpdateLoading;

    function onClick() {
        dispatch(updateUserPhoto(true));
    }

    function onCancel() {
        dispatch(updateUserPhoto(false));
    }

    if(isUpdating) {
        return (
            <Loader />
        )
    }

    if(isEditing){
        return (
            <div className="user-info">
                <UploadPictureForm />
                <button onClick={onCancel}>Cancel</button>
            </div>
        )
    }

    return (
        <div className="user-info">
            <img src={AMZ_S3_URL+profilePicture} className="user-img" alt="current user"></img>
            <Pencil className="pen" onClick={onClick} role="button" size={16} />
            <a className="user-fullname">Hi, {fullName}</a>
            <header>Assigned Tickets: </header>
            <AssignedList watching={assigned} />
            <div className="ticket-color-info">
                <ul>
                    <li>
                        <ExternalLink color="#FF5630" size={16} /> Overdue
                    </li>
                    <li>
                        <ExternalLink color="#FF991F" size={16} /> Due Soon
                    </li>
                    <li>
                        <ExternalLink color="#36B37E" size={16} /> Got time
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserInfo;
