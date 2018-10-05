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
      const { input, label, options, currentValue } = this.props;

      const defaultSelect = currentValue? <option value={currentValue}>{currentValue}</option>
       : <option value="">Select</option>

      return (
        <div>
          <label htmlFor={label}>{label}: </label>
          <select {...input}>
            {defaultSelect}
          {options.filter(option => !(option.text === currentValue)).map(this.renderSelectOptions)}
          </select>
        </div>
      );
    }
  }
  

  export default DropDown;