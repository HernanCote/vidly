import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/common/navbar';
import ProtectedRoute from './components/common/protectedRoute';
import MovieForm from './components/movieForm';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main style={{ paddingTop: 30 }} className='container'>
          <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={RegisterForm} />
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route
              path='/movies'
              render={props => <Movies {...props} user={user} />}
            />
            <ProtectedRoute path='/customers' component={Customers} />
            <ProtectedRoute path='/rentals' component={Rentals} />
            <Route path='/logout' component={Logout} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
