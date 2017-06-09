import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { clearError, signinUser } from '../../actions';

class Signin extends Component {

  componentWillUnmount() {
    this.props.clearError();
  }

  handleFormSubmit = ({email, password}) => {
    this.props.signinUser({ email, password });
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
    const { handleSubmit, fields: { email, password }} = this.props;

    return(
      <form className='signin' onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input {...email} className='form-control' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input {...password} type='password' className='form-control' />
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign In</button>
      </form>
    );  
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, {clearError, signinUser})(Signin);