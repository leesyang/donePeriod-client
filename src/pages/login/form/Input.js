import React from 'react';

export default class Input extends React.Component {
    render () {
        let errorNotify;

        if (this.props.meta.touched && this.props.meta.error) {
            errorNotify = (
                <div className="input-error">{this.props.meta.error}</div>
            )
        }
        console.log(this.props);
        return (
            <div className="form-input">
                <div className="error-message">{errorNotify}</div>
                <label htmlFor={this.props.input.name}>{this.props.label}</label>
                <input
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                />
            </div>
        )
    }
}