import React from 'react';

export function UserSelect({ value = '', onChange, onSelect, users, error }) {
    function filterUsers(list) {
        if (!value) return list;
        const q = value.toUpperCase();
        return list.filter(u => (u.firstName + ' ' + u.lastName).toUpperCase().includes(q));
    }

    return (
        <div>
            <label>Assign to: </label>
            {error && <div className="error-message"><div className="input-error">{error.message}</div></div>}
            <input type="text" value={value} onChange={onChange} />
            <div className="user-options">
                {filterUsers(users).map(user => {
                    const fullName = user.firstName + ' ' + user.lastName;
                    return (
                        <button
                            className="user-select-option"
                            key={user.id}
                            type="button"
                            onClick={() => onSelect(user.id, fullName)}
                        >
                            {fullName}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default UserSelect;
