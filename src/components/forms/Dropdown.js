import React from 'react';

export class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.renderSelectOptions = this.renderSelectOptions.bind(this);
    }

    renderSelectOptions = (option) => (
      <option key={option.value} value={option.value}>{option.text}</option>
    )
  
    render() {
      const { input, label, options } = this.props;
      return (
        <div>
          <label htmlFor={label}>{label}: </label>
          <select {...input}>
            <option value="">Select</option>
          {options.map(this.renderSelectOptions)}
          </select>
        </div>
      );
    }
  }
  

  export default DropDown;