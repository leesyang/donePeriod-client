import React from 'react';

export default function InputTextArea({ label, error, ...rest }) {
    return (
        <div className="form-input">
            {label && <label htmlFor={rest.name}>{label}: </label>}
            <div className="error-message">
                {error && <div className="input-error">{error.message}</div>}
            </div>
            <textarea {...rest} />
        </div>
    );
}
