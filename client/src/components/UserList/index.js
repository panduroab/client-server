/**
 * @author Abraham Panduro https://github.com/panduroab
 */
import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  /**
   * Request for a list of Users
   *
   * @return  {Promise}
   */
  _fetchUsers = async () => {
    const result = await axios.get(`${process.env.REACT_APP_HOST}/users`);
    return result.data;
  }

  /**
   * Gerenare a display element of users
   *
   * @param users User arrays
   * @return  {Array}  JSX array
   */
  _displayUserList = (users) => {
    return users.map((user, i) =>
      <div key={i}>
        {user.firstName} {user.lastName}, {user.email}
      </div>
    );
  }

  componentDidMount() {
    /*this.setState(currentState=>{
      const _currentState = Object.assign({}, currentState);
      _currentState.users.push({user});
      return _currentState;
    })*/
    this._fetchUsers()
      .then(users => {
        this.setState(currentState =>
          update(currentState, {
            users: {
              $set: users
            }
          })
        );
      });
  }

  render() {
    const userList = this._displayUserList(this.state.users);
    return (
      <div>
        <h3>Users</h3>
        {userList}
      </div>
    );
  }
}

export default UserList;