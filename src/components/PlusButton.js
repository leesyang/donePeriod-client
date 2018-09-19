import React from 'react';

import './PlusButton.css';

export default class PlusButton extends React.Component {
    render() {
        const { text, onClick } = this.props;

        return (
            <div>
                <div className="sign" onClick={onClick}>&#x2b;</div>
                <span className="text">{text}</span>
            </div>
        )
    }
}