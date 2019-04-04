import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'

import Users from './Users';
import Login from './auth/Login';
import Register from './auth/Register'

const Home = props =>{
  return <h1>Hello world!</h1>
}

class App extends Component {

  signout = () => {
    localStorage.removeItem('jwt');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
         <nav>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
         </nav>
         <section>
           <Route exact path='/' component={Home} />
           <Route path='/users' component={Users} />
           <Route path='/login' component={Login} />
           <Route path='/register' component={Register} />
         </section>
        </header>
      </div>
    );
  }
}

export default App;