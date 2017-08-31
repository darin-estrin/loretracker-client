import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField, RaisedButton, Paper } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import { changePassword } from '../../actions';
import * as styles from '../../css/material_styles';

class ChangePassword extends Component {

  renderField({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) {
    return (
      <TextField
        hintText={label}
        hintStyle={{color:grey900}}
        floatingLabelText={label}
        floatingLabelFocusStyle={{color:'#0097A7'}}
        underlineStyle={styles.styles.underlineStyle}
        floatingLabelStyle={styles.styles.floatingLabelStyle}
        errorText={touched && error}
        fullWidth
        inputStyle={styles.inputStye}
        {...input}
        {...custom}
      />
    );
  }

  handleFormSubmit = (values) => {
    const regex1 = /^(\s+)|(\s+)$/g;
    for (var value in values) {
      // replace all excess white space in front and end of string
      // replace excess white space in the middle of a string and replace with one empty space
      values[value] = values[value].replace(regex1, '');
    }
    
    this.props.changePassword(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className='container'>
        <Paper style={styles.paperStyle} zDepth={4}>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div>
              <Field type='password' label='Password' name='password' 
              component={this.renderField} />
            </div>
            <div>
              <Field type='password' label='Confirm Password' name='passwordConfirm' 
              component={this.renderField} />
            </div>
            <RaisedButton
              labelStyle={styles.paperButtonStyle} 
              type='submit' 
              label='Submit' />
            <Link to='/campaigns'>
              <RaisedButton 
                secondary={true} 
                labelStyle={styles.paperButtonStyle}
                style={styles.buttonStyle} 
                label='Cancel'/>
            </Link>
          </form>
        </Paper>
      </div>
    );
  }
}

function validate(values) {
  const errors = {}

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  }

  if(values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}


export default reduxForm({
  form: 'change_password',
  validate
})(connect(mapStateToProps, { changePassword })(ChangePassword));