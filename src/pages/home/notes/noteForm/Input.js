import React from 'react';

export default class NoteInput extends React.Component {
    render () {
        let errorNotify;

        if (this.props.meta.touched && this.props.meta.error) {
            errorNotify = (
                <div className="input-error">{this.props.meta.error}</div>
            )
        }

        return (
            <div className="note-form-input">
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