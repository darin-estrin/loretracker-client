import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, Paper } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import { clearError, signinUser } from '../../actions';
import * as styles from '../../css/material_styles';

class Signin extends Component {


  componentWillUnmount() {
    this.props.clearError();
  }

  handleFormSubmit = ({email, password}) => {
    const regex1 = /^(\s+)|(\s+)$/g;
    for (var value in values) {
      // replace all excess white space in front and end of string
      // replace excess white space in the middle of a string and replace with one empty space
      values[value] = values[value].replace(regex1, '');
    }
    this.props.signinUser({ email, password });
  }

  renderFields({
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

  renderAlert = () => {
    if(this.props.errorMessage) {
      return(
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <Paper style={styles.paperStyle} zDepth={4} className='container'>
        <form className='signin' onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field name='email' label='Email' component={this.renderFields} />
          </div>
          <div>
            <Field name='password' label='Password' type='password' component={this.renderFields} />
          </div>
          {this.renderAlert()}
          <RaisedButton label='Sign In' type='submit' />
        </form>
      </Paper>
      
    );  
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin'
})(connect(mapStateToProps, {clearError, signinUser})(Signin));