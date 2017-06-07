import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
const validator = require('email-validator');

class StartCampaign extends Component {
  handleFormSubmit = (formProps) => {
    this.props.startCampaign(formProps);
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
    const { handleSubmit, fields: { name, email1, email2, email3, email4, email5, email6  }} = this.props;

    return(
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className='form-group'>
            <label>Campaign Name *</label>
            <input className='form-control' placeholder='Princes of the Apocalypse' {...name} />
            {name.touched && name.error && <div className='alert alert-danger'><strong>{name.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Add Player Email *</label>
            <input className='form-control' placeholder='Uktar@email.com' {...email1} />
            {email1.touched && email1.error && <div className='alert alert-danger'><strong>{email1.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Add Player Email</label>
            <input className='form-control' placeholder='Thrilhaus@email.com' {...email2} />
            {email2.touched && email2.error && <div className='alert alert-danger'><strong>{email2.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Add Player Email</label>
            <input className='form-control' placeholder='Andraste@email.com' {...email3} />
            {email3.touched && email3.error && <div className='alert alert-danger'><strong>{email3.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Add Player Email</label>
            <input className='form-control' placeholder='Leucis@email.com' {...email4} />
            {email4.touched && email4.error && <div className='alert alert-danger'><strong>{email4.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Add Player Email</label>
            <input className='form-control' placeholder='Daar@email.com' {...email5} />
            {email5.touched && email5.error && <div className='alert alert-danger'><strong>{email5.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Add Player Email</label>
            <input className='form-control' placeholder='Jeff@email.com' {...email6} />
            {email6.touched && email6.error && <div className='alert alert-danger'><strong>{email6.error}</strong></div>}
          </fieldset>
          {this.renderAlert()}
          <button action='submit' className='btn btn-primary'>Start Campaign</button>
        </form>      
      </div>
    );
  }
}

function validate(formProps) {
  const { name, email1, email2, email3, email4, email5, email6 } = formProps;
  const errors = {};

  if (!name) {
    errors.name = 'Please enter the name of the campaign';
  }

  if (!validator.validate(email1)) {
    errors.email1 = 'Please enter a valid player email address';
  }

  if (!validator.validate(email2) && email2 !== undefined) {
    errors.email2 = 'Please enter a valid player email address';
  }

  if (!validator.validate(email3) && email2 !== undefined) {
    errors.email3 = 'Please enter a valid player email address';
  }

  if (!validator.validate(email4) && email2 !== undefined) {
    errors.email4 = 'Please enter a valid player email address';
  }

  if (!validator.validate(email5) && email2 !== undefined) {
    errors.email5 = 'Please enter a valid player email address';
  }

  if (!validator.validate(email6) && email2 !== undefined) {
    errors.email6 = 'Please enter a valid player email address';
  }

  if (!email1) {
    errors.email1 = 'Please add at least one player';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.user.error };
}

export default reduxForm({
  form: 'startCampaign',
  fields: [ 'name', 'email1', 'email2', 'email3', 'email4', 'email5', 'email6' ],
  validate
},null, actions)(StartCampaign);