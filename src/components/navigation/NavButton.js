import React from 'react';

export default function NavButton({ name, onClick }) {
    return (
        <button
            className="nav-button"
            type="button"
            name={name}
            value=''
            onClick={onClick}
            >
                {name}
        </button>
    )
}
