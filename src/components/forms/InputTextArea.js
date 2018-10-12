import React from 'react';

export default class InputTextArea extends React.Component {
    render () {
        const { label } = this.props;
        let errorNotify;

        if (this.props.meta.touched && this.props.meta.error) {
            errorNotify = (
                <div className="input-error">{this.props.meta.error}</div>
            )
        }

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>{label? `${label}: `: undefined} </label>
                <div className="error-message">{errorNotify}</div>
                <textarea
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                />
            </div>
        )
    }
}