import React from 'react';

export default function InputWorkLog({ label, error, type, ...rest }) {
    return (
        <div className="form-input">
            {error && <div className="error-message"><div className="input-error">{error.message}</div></div>}
            <label htmlFor={rest.name}>{label}: </label>
            <input type={type} multiple {...rest} />
        </div>
    );
}
