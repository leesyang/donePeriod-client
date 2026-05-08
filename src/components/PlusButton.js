import React from 'react';

import './PlusButton.css';
import { Plus } from 'lucide-react';

export default function PlusButton({ onClick }) {
    return (
        <button className="plus-button">
            <Plus className="icon-plus" onClick={onClick} size={20} />
        </button>
    )
}
