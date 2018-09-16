import React from 'react';

export class UserSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(e, userId) {
    const { change } = this.props;
    change('assignee', userId );
  }

  renderSelectOptions = (users) => {
    return users.map(user => {
      const fullName = user.firstName + ' ' + user.lastName;
      return <div
        className="user-select-option"
        key={user.id}
        onClick={e => this.onClick(e, user.id)}
        >
        {fullName}
      </div>
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
    return (
      <div>
        <label htmlFor={label}>{label}: </label>
        <input type="text" {...input}></input>
        <div className="user-options">
          {this.renderSelectOptions(this.filterUsers(users))}
        </div>
      </div>
    );
  }
}

export default UserSelect;