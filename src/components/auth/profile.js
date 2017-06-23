import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import { updateProfile, getUser } from '../../actions';
import * as styles from '../../css/material_styles';
const validator = require('email-validator');

class Profile extends Component {
  componentWillMount() {
    this.props.getUser();
  }

  renderField({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) {
    return (
      <TextField
        hintText={label === 'Phone Number' ? '5555555555' : label}
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
    const regex2 = /\s{2,}/g;
    for (var value in values) {
      // replace all excess white space in front and end of string
      // replace excess white space in the middle of a string and replace with one empty space
      values[value] = values[value].replace(regex1, '').replace(regex2, ' ');
    }
    this.props.updateProfile(values);

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

  renderProfileData() {
    const { user } = this.props;
    if (!user) { return; }
    return(
      <List style={styles.listStyle}>
        <ListItem style={styles.listItemStyle} disabled primaryText={user.name} />
        <ListItem style={styles.listItemStyle} disabled primaryText={user.email} />
        {user.phone ? <ListItem style={styles.listItemStyle} disabled primaryText={user.phone} /> : ''}
      </List>
    )
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className='container'>
        <Paper style={styles.paperStyle}>
          {this.renderProfileData()}
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div>
              <Field label='Name' name='name' component={this.renderField} />
            </div>
            <div>
              <Field label='Email' name='email' component={this.renderField} />
            </div>
            <div>
              <Field label='Phone Number' name='phone' component={this.renderField} />
            </div>
            {this.renderAlert()}
            <RaisedButton type='submit' label='Submit' />
          </form>
          <div>
            <Link to='/changepassword'>
              <RaisedButton primary={true} style={{marginTop: '10px'}} label='Change Password'/>
            </Link>
            <Link to='/campaigns'>
              <RaisedButton secondary={true} 
              style={{float: 'right', marginTop: '10px'}} label='Cancel'/>
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  
  if (values.phone && !phoneRegex.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (values.email && !validator.validate(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
    user: state.auth.user
  }
}

export default reduxForm({
  form: 'update_profile',
  validate
})(connect(mapStateToProps, { updateProfile, getUser })(Profile));