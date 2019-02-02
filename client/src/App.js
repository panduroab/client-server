import React, { Component } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

class App extends Component {
  render() {
    return (
      <div>
        <UserForm />
        <UserList />
      </div>
    );
  }
}

export default App;
