import React from 'react';

export function DropDown({ label, options, error, ...rest }) {
    return (
        <div>
            <label htmlFor={rest.name}>{label}: </label>
            <select {...rest}>
                <option value="">Select</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                ))}
            </select>
            {error && <div className="input-error">{error.message}</div>}
        </div>
    );
}

export default DropDown;
