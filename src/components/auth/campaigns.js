import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, RaisedButton, Paper } from 'material-ui';
import { grey900, grey50 } from 'material-ui/styles/colors';
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form';
import { getUserData, startCampaign } from '../../actions';
require('../../css/form.scss');

const styles = {
  underlineStyle: {
    borderColor: grey900
  },
  floatingLabelStyle: {
    color: grey900
  }
}

const paperStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  color: grey900,
  padding: '2%',
  minHeight: '50vh',
  display: 'flex',
  flexDirection: 'column'
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
    this.props.reset();
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
          hintStyle={{color:grey900}}
          floatingLabelText={label}
          floatingLabelFocusStyle={{color:'#0097A7'}}
          underlineStyle={styles.underlineStyle}
          floatingLabelStyle={styles.floatingLabelStyle}
          errorText={touched && error}
          fullWidth
          inputStyle={{color:grey900, fontSize: '2vmax'}}
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
      <div className='container'>
        <h1 className='greeting'>Welcome {this.props.name}</h1>
            <Paper zDepth={4} style={paperStyle}>
              <div className='campaigns'>
                {this.renderDMCampaigns()}
                {this.renderPCCampaigns()}
              </div>
              <div className='campaign-add'>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                  <div>
                    <Field label='Campaign Name' name='name' component={this.renderField} />
                  </div>
                  <RaisedButton label='Start A New Campaign' type='submit' />
                </form>
              </div>           
            </Paper>
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