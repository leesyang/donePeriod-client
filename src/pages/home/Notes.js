import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import Note from './notes/Note';
import PlusButton from '../../components/PlusButton';
import NoteForm from './notes/NoteForm';
import LoaderSm from '../../components/LoaderSm';

// ----- actions -----
import { addNote, noteAdding, deleteNote } from '../../modules/auth';

export class Notes extends React.Component {
    onClick() {
        this.props.dispatch(noteAdding(true));
    }

    onCancel() {
        this.props.dispatch(noteAdding(false));
    }

    onDelete(noteId) {
        this.props.dispatch(deleteNote(noteId))
    }

    render() { 
        const { noteadding, noteloading, notes, error, errorInfo } = this.props;

        let noteForm;

        noteadding? noteForm = 
            (<div className="note-form">
                <NoteForm />
                <button onClick={() => this.onCancel()}>Close</button>
            </div>) : undefined;

        noteloading? noteForm = <LoaderSm /> : undefined;

        let allNotes
        if(notes.length > 0){
            allNotes = notes.map(note => <Note key={note._id} note={note} onDelete={(noteId) => this.onDelete(noteId)} />)
        } else {
            allNotes = undefined;
        }

        return (
            <div className="notes">
                <PlusButton text='Add a note' onClick={() => this.onClick()} />
                {noteForm}
                {allNotes}
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        noteadding: state.auth.currentUser.noteadding,
        noteloading: state.auth.currentUser.noteloading,
        notes: state.auth.currentUser.notes,
        error: state.auth.currentUser.error,
        errorInfo: state.auth.currentUser.errorInfo
    }
}

export default connect(mapStateToProps)(Notes)