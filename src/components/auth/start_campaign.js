import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class StartCampaign extends Component {
  render() {
    return(
      <div>
      
      </div>
    );
  }
}

export default reduxForm({
  form: 'startCampaign',
  fields: []
},null, actions)(StartCampaign);