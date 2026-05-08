import React from 'react';

const Input = React.forwardRef(function Input({ label, error, type, autoComplete, ...rest }, ref) {
    return (
        <div className="form-input">
            {label && <label htmlFor={rest.name}>{label}</label>}
            <div className="error-message">
                {error && <div className="input-error">{error.message}</div>}
            </div>
            <input type={type} autoComplete={autoComplete} ref={ref} {...rest} />
        </div>
    );
});

export default Input;
