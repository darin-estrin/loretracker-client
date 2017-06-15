import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import { grey900, grey50 } from 'material-ui/styles/colors';
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form';
import { getUserData, startCampaign } from '../../actions';
require('../../css/greeting.scss');

const styles = {
  underlineStyle: {
    borderColor: grey900
  },
  floatingLabelStyle: {
    color: grey900
  }
}

class Campaigns extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    this.props.getUserData();
  }

  handleFormSubmit = (formProps) => {
    this.props.startCampaign(formProps);
    this.props.resetForm();
  }

  renderField({
    input,
    label,
    meta: { touched, error },
    custom
  }) {
    return (
        <TextField
          hintText={label}
          floatingLabelText={label}
          underlineStyle={styles.underlineStyle}
          floatingLabelStyle={styles.floatingLabelStyle}
          errorText={touched && error}
          fullWidth={true}
          {...input}
          {...custom}
        />
    );
  }
  
  renderCampaignList(campaignListToRender, type){
    return campaignListToRender.map(function(object){
      return (
        <li className='list-group-item' key={object._id}>
          <h4><Link to={`/campaigns/${type}/${object._id}/roster`}>{object.campaignName}</Link></h4>
        </li>
      );
    });
  }

  renderDMCampaigns(){
    const { DMCampaigns } = this.props;
    if (DMCampaigns.length < 1){
      return;
    } else {
      return (
        <div>
          <h2>Select A Campaign To Edit</h2>
          <ul className='list-group'>
            {this.renderCampaignList(DMCampaigns, 'dm')}
          </ul>
        </div>
      )
    }
  }

  renderPCCampaigns() {
    const { PCCampaigns } = this.props;
    if (PCCampaigns.length >= 1) {
      return (
        <div>
          <h2>Select a Campaign To View</h2>
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
    const { handleSubmit } = this.props;
    return(
      <div>
        <h1 className='greeting'>Welcome {this.props.name}</h1>
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
            {this.renderDMCampaigns()}
            {this.renderPCCampaigns()}
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div>
                <Field label='Campaign Name' name='name' component={this.renderField} />
              </div>
              <RaisedButton label='Start A New Campaign' type='submit' />
            </form>
            </div>
            <div className='col-md-6 col-xs-12'>
            
            </div>
          </div>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {}

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
  validate
})(connect(mapStateToProps, { getUserData, startCampaign })(Campaigns));