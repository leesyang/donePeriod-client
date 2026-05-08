import React from 'react';

export default function Input({ label, error, type, ...rest }) {
    return (
        <div className="form-input">
            <div className="error-message">
                {error && <div className="input-error">{error.message}</div>}
            </div>
            <label htmlFor={rest.name}>{label}: </label>
            <input type={type} {...rest} />
        </div>
    );
}
