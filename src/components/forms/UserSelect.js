import React from 'react';

export class UserSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(e, userId, fullName) {
    const { change } = this.props;
    change('userSelect', fullName);
    change('assignee', userId );
  }

  renderSelectOptions = (users) => {
    return users.map(user => {
      const fullName = user.firstName + ' ' + user.lastName;
      return (
        <button className="user-select"
          className="user-select-option"
          key={user.id}
          onClick={e => this.onClick(e, user.id, fullName)}
          >
          {fullName}
        </button>
      )
    })
  };

  filterUsers(users) {
    let input = this.props.input.value.toUpperCase();
    if(!input) { input = null }

    const evalField = (field) => field.toUpperCase().indexOf(input)
    
    return users.filter(user => {
      const fullName = user.firstName + ' ' + user.lastName;
      return evalField(fullName) > -1
    })
  };

  render() {
    const { input, label, users } = this.props;

    let errorNotify;
    if (this.props.meta.touched && this.props.meta.error) {
      errorNotify = (
          <div className="input-error">{this.props.meta.error}</div>
      )
    }

    return (
      <div>
        <label htmlFor={label}>{label}: </label>
        <div className="error-message">{errorNotify}</div>
        <input type="text" {...input}></input>
        <div className="user-options">
          {this.renderSelectOptions(this.filterUsers(users))}
        </div>
      </div>
    );
  }
}

export default UserSelect;