import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';
import { grey900, grey50 } from 'material-ui/styles/colors';
import { clearError, signinUser } from '../../actions';

const styles = {
  underlineStyle: {
    borderColor: grey900
  },
  floatingLabelStyle: {
    color: grey900
  }
}

class Signin extends Component {


  componentWillUnmount() {
    this.props.clearError();
  }

  handleFormSubmit = ({email, password}) => {
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
          underlineStyle={styles.underlineStyle}
          floatingLabelStyle={styles.floatingLabelStyle}
          errorText={touched && error}
          fullWidth
          inputStyle={{color:grey900}}
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
    );  
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin'
})(connect(mapStateToProps, {clearError, signinUser})(Signin));