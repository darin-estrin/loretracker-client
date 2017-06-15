import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField, RaisedButton }  from 'material-ui';
import { grey900, grey50 } from 'material-ui/styles/colors';
import { signupUser } from '../../actions';
const validator = require('email-validator');

const styles = {
  underlineStyle: {
    borderColor: grey900
  },
  floatingLabelStyle: {
    color: grey900
  }
}



class Signup extends Component {
  handleFormSubmit = (formProps) => {
    this.props.signupUser(formProps)
  }

  renderField({
    input,
    label,
    meta: {touched, error },
    ...custom
  }) {
    return (
      <TextField
          hintText={label}
          hintStyle={{color:grey900}}
          floatingLabelText={label}
          floatingLabelFocusStyle={{color:'#0097A7'}}
          underlineStyle={styles.underlineStyle}
          floatingLabelStyle={styles.floatingLabelStyle}
          errorText={touched && error}
          fullWidth
          inputStyle={{color:grey900}}
          {...input}
          {...custom}
        />
    )
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
    const { handleSubmit } = this.props;
    return (
      <div>
        <form className='signup' onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field name='name' label='Name' component={this.renderField} />
          </div>
          <div>
            <Field name='email' label='Email' component={this.renderField} />
          </div>
        <div>
          <Field name='password' label='Password' component={this.renderField} />
        </div>
          <div>
            <Field name='passwordConfirm' label='Confirm Password' component={this.renderField} />
          </div>
          <div>
            <Field name='phone' label='Phone Number' component={this.renderField} />
          </div>
          <RaisedButton label='Sign Up' type='submit' />
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const { password, passwordConfirm, email, name } = formProps;
  const errors = {};

  if (!name) {
    errors.name = 'Please enter a name';
  }

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

  // if (!phoneRegex.test(phone)) {
  //   errors.phone = 'Please enter a valid phone number';
  // }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  validate
})(connect(mapStateToProps, { signupUser })(Signup));