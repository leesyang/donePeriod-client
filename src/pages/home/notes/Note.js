import React from 'react';

export default class Note extends React.Component {
    render() {
        return (
            <div>This is an Entry {this.props.num}</div>
        )
    }
}