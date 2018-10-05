import React from 'react';

import './PlusButton.css';
import Ionicon from 'react-ionicons';

export default class PlusButton extends React.Component {
    render() {
        const { text, onClick } = this.props;

        return (
            <button className="plus-button">
                <Ionicon icon="md-add" className="icon-plus"  onClick={onClick} /> Add a Note
            </button>
        )
    }
}