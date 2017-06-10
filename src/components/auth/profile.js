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
  
  renderCampaignList(campaignListToRender, type){
    return campaignListToRender.map(function(object){
      return (
        <li className='list-group-item' key={object._id}>
          <h4><Link to={`/profile/${type}/${object._id}`}>{object.campaignName}</Link></h4>
        </li>
      );
    });
  }

  renderDMCampaigns(){
    const { handleSubmit, fields: { name } , DMCampaigns } = this.props;
    if (DMCampaigns.length < 1){
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
            {this.renderCampaignList(DMCampaigns, 'dm')}
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
    if (PCCampaigns.length >= 1) {
      return (
        <div>
          <h3>Select a Campaign To View</h3>
          <ul className='list-group'>
            {this.renderCampaignList(PCCampaigns, 'pc')}
          </ul>
        </div>
      )
    } else {
      return;
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
  const { name, DMCampaigns, PCCampaigns } = state.user;
  return {
    name: name,
    DMCampaigns: _.map(DMCampaigns, _.partial(_.ary(_.pick, 2), _, ['campaignName', '_id'])),
    PCCampaigns: _.map(PCCampaigns, _.partial(_.ary(_.pick, 2), _, ['campaignName', '_id']))
  }
}

export default reduxForm({
  form:'start_campaign',
  fields: ['name'],
  validate
}, mapStateToProps, { getUserData, startCampaign })(Profile);