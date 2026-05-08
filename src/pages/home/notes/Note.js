import React from 'react';
import { ChevronRight } from 'lucide-react';

// ----- utils -----
import { formatDateShort } from '../../../utils/auth';

// ----- css -----
import './Note.css'

export default function Note({ note, onDelete }) {
    return (
        <li className="note">
            <p className="note-comment"><ChevronRight size={14} color="#C9C9C9" />{note.comment}</p>
            <p className="note-info">
                posted: {formatDateShort(note.created)} | <a className="note-delete" onClick={() => onDelete(note._id)}>Delete</a>
            </p>
        </li>
    )
}
