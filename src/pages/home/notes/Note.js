import React from 'react';
import Ionicon from 'react-ionicons';

// ----- utils -----
import { formatDateShort } from '../../../utils/auth';

// ----- css -----
import './Note.css'

export default class Note extends React.Component {
    render() {
        const { note, onDelete } = this.props;
        return (
            <li className="note">
                <p className="note-comment"><Ionicon icon="md-arrow-dropright" fontSize="1em" color="#C9C9C9"/>{note.comment}</p>
                <p className="note-info">
                    posted: {formatDateShort(note.created)} | <a className="note-delete" href="#" onClick={() => onDelete(note._id)}>Delete</a>
                </p>

            </li>
        )
    }
}