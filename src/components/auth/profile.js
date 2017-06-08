import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash'
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
require('../../css/greeting.scss');

const token = localStorage.getItem('token');

class Profile extends Component {
  componentWillMount() {
    this.props.getUserData();
  }

  handleFormSubmit = (formProps) => {
    this.props.startCampaign(formProps);
  }

  renderDMCampaigns(){
    const campaigns =  _.map(this.props.DMCampaigns, 'campaignName');
    return campaigns.map(function(name) {
      return (
        <li className='list-group-item' key={name}>
          <h2>{name}</h2>
        </li>
      )
    }) 
  }

  renderPage() {
    const { handleSubmit, fields: { name }} = this.props;
    if (!this.props.DMCampaigns || this.props.PCCampaigns) {
      return(
        <div>
          <h1 className='greeting'>Welcome {this.props.name}</h1>
          <h3>To get started either start a campaign or ask your Dungeon Master to invite you to theirs.</h3>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <fieldset className='form-group'>
              <label>* Campaign Name:</label>
              <input className='form-control' placeholder='Princes of the Apocalypse' {...name} />
              {name.touched && name.error && <div className='alert alert-danger'><strong>{name.error}</strong></div>}
            </fieldset>
            <button action='submit' className='btn btn-primary'>Start Campaign</button>
          </form>
        </div>
      )
    }
     else {
       return (
         <div className='row'>
          <div className='col-lg-4 col-md-6 col-xs-12'>
            <h2>Campaigns you are Running</h2>
            {this.renderDMCampaigns()}
            <button className='btn btn-primary'>Create New Campaign</button>
          </div>
         </div>
     )
    }
  }

  render() {
    return(
      <div>
       {this.renderPage()} 
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    DMCampaigns: state.user.DMCampaigns,
    PCCampaigns: state.user.PCCampaigns
  };
}

export default reduxForm({
  form:'start_campaign',
  fields: ['name']
}, mapStateToProps, actions)(Profile);