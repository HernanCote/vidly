import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import * as userService from '../services/userService';

class RegisterForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
        name: ''
      },
      errors: {}
    };
  }

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    password: Joi.string()
      .min(5)
      .required()
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className='mx-auto col-md-6 col-sm-6 '>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email', 'text', true)}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Sign Up')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
