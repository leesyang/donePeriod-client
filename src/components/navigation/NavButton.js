import React from 'react';

export default class NavButton extends React.Component {
    render () {
        return (
            <button
                className="nav-button"
                type="button"
                name={this.props.name}
                value=''>
                {this.props.name}
            </button>
        )
    }
}