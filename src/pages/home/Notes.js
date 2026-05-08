import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ----- components -----
import Note from './notes/Note';
import PlusButton from '../../components/PlusButton';
import NoteForm from './notes/NoteForm';
import LoaderSm from '../../components/LoaderSm';

// ----- actions -----
import { noteAdding, deleteNote } from '../../modules/auth';

// ----- css -----
import './Notes.css';

export function Notes() {
    const dispatch = useDispatch();
    const noteadding = useSelector(state => state.auth.currentUser.noteadding);
    const noteloading = useSelector(state => state.auth.currentUser.noteloading);
    const notes = useSelector(state => state.auth.currentUser.notes);

    function onClick() {
        dispatch(noteAdding(true));
    }

    function onCancel() {
        dispatch(noteAdding(false));
    }

    function onDelete(noteId) {
        dispatch(deleteNote(noteId));
    }

    let noteForm = noteadding?
        (<div className="note-form">
            <NoteForm onClick={() => onCancel()}/>
        </div>) : undefined;

    if(noteloading) { noteForm = <LoaderSm /> }

    let allNotes;
    if(notes.length > 0){
        allNotes = notes.map(note => {
            return <Note key={note._id} note={note} onDelete={(noteId) => onDelete(noteId)} />
            })
    } else {
        allNotes = undefined;
    }

    return (
        <div className="notes">
            <PlusButton onClick={() => onClick()}/>
            {noteForm}
            <ul className="all-notes">
                {allNotes}
            </ul>
        </div>
    )
}

export default Notes;
