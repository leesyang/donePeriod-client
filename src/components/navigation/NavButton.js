import React from 'react';

export default class NavButton extends React.Component {
    render () {
        return (
            <button
                className="nav-button"
                type="button"
                name={this.props.name}
                value=''
                onClick={this.props.onClick}
                >
                    {this.props.name}
            </button>
        )
    }
}