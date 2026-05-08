import React from 'react';

export default function NoteInput({ meta, input, type, label }) {
    let errorNotify;

    if (meta.touched && meta.error) {
        errorNotify = (
            <div className="input-error">{meta.error}</div>
        )
    }

    return (
        <div className="note-form-input">
            <div className="error-message">{errorNotify}</div>
            <label htmlFor={input.name}>{label}</label>
            <input
                {...input}
                id={input.name}
                type={type}
            />
        </div>
    )
}
