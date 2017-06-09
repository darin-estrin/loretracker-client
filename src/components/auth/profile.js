import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash'
import { reduxForm } from 'redux-form';
import { getUserData, startCampaign } from '../../actions';
require('../../css/greeting.scss');

const token = localStorage.getItem('token');

class Profile extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    this.props.getUserData();
  }

  handleFormSubmit = (formProps) => {
    this.props.startCampaign(formProps);
  }

  renderCampaignList(userType ,campaignListToRender){
    const campaigns = _.map(campaignListToRender, 'campaignName');
      return campaigns.map(function(name) {
      return (
        <li className='list-group-item' key={name}>
          <h4><Link to={`/profile/${userType}/${name}`}>{name}</Link></h4>
        </li>
      )
    });
  }

  renderDMCampaigns(){
    const { handleSubmit, fields: { name } , DMCampaigns } = this.props;
    const campaigns =  _.map(DMCampaigns, 'campaignName');
    if (campaigns.length < 1){
      return(
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className='form-group'>
            <label>* Campaign Name:</label>
            <input className='form-control' placeholder='Princes of the Apocalypse' {...name} />
            {name.touched && name.error && <div className='alert alert-danger'><strong>{name.error}</strong></div>}
          </fieldset>
          <button action='submit' className='btn btn-primary'>Start Campaign</button>
        </form>
      )
    } else {
      return (
        <div>
          <h3>Select a Campaign To Edit</h3>
          <ul className='list-group'>
            {this.renderCampaignList('dm', DMCampaigns)}
          </ul>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <fieldset className='form-group'>
              <label>* Campaign Name:</label>
              <input className='form-control' placeholder='Princes of the Apocalypse' {...name} />
              {name.touched && name.error && <div className='alert alert-danger'><strong>{name.error}</strong></div>}
            </fieldset>
            <button action='submit' className='btn btn-primary'>Start a New Campaign</button>
          </form>
        </div>
      )
    }
  }

  renderPCCampaigns() {
    const { PCCampaigns } = this.props;
    const campaigns =  _.map(PCCampaigns, 'campaignName');
    if (campaigns.length >= 1) {
      return (
        <div>
          <h3>Select a Campaign To View</h3>
          <ul className='list-group'>
            {this.renderCampaignList('pc', PCCampaigns)}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          You are not playing in any campaigns
        </div>
      )
    }
  }

  render() {
    const { fields: { name }} = this.props;
    return(
      <div>
        <h1 className='greeting'>Welcome {this.props.name}</h1>
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
            {this.renderDMCampaigns()}
            </div>
            <div className='col-md-6 col-xs-12'>
            {this.renderPCCampaigns()}
            </div>
          </div>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {}
  const regex = new RegExp(/^\s*|\s*$/g);
  const regex2 = new RegExp(/\s{2,}/g);

  if (formProps.name && formProps.name.length > 1) {
    formProps.name = formProps.name.replace(regex, '', regex2, ' ');
  }

  if (!formProps.name || formProps.name.length < 4) {
    errors.name = 'Campaign name shoulde be at least four character long';
  }

  return errors;
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
  fields: ['name'],
  validate
}, mapStateToProps, { getUserData, startCampaign })(Profile);