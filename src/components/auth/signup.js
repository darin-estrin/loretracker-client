import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
const validator = require('email-validator');
require('../../css/form.scss');

class Signup extends Component {
  handleFormSubmit = (formProps) => {
    this.props.signupUser(formProps)
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className='form-group'>
            <label>Email:</label>
            <input className='form-control' {...email} />
            {email.touched && email.error && <div className='error'>{email.error}</div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Password:</label>
            <input type='password' className='form-control' {...password} />
            {password.touched && password.error && <div className='error'>{password.error}</div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Confirm Password:</label>
            <input type='password' className='form-control' {...passwordConfirm} />
            {passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>}
          </fieldset>
          {this.renderAlert()}
          <button className='btn btn-primary'>Sign Up</button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const { password, passwordConfirm, email } = formProps;
  const errors = {};

  if (!validator.validate(email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  }

  if (password !== passwordConfirm) {
    errors.password = 'Password must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: [ 'email', 'password', 'passwordConfirm' ],
  validate
}, mapStateToProps, actions)(Signup);