import React from 'react';

// ----- utils -----
import { formatDateShort } from '../../../utils/auth';

export default class Note extends React.Component {

    render() {
        const { note, onDelete } = this.props;
        return (
            <div className="note">
                <div className="note-comment">- {note.comment}</div>
                <div className="note-date">posted on {formatDateShort(note.created)}</div>
                <a className="delete" href="#" onClick={() => onDelete(note._id)}>Delete</a>
            </div>
        )
    }
}