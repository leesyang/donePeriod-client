import React from 'react';
import './Input.css';

export default function Input({ label, error, type, ...rest }) {
    return (
        <div className="form-input">
            {label && <label htmlFor={rest.name}>{label}: </label>}
            <div className="error-message">
                {error && <div className="input-error">{error.message}</div>}
            </div>
            <input type={type} {...rest} />
        </div>
    );
}
