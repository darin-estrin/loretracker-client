import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form';
import { getUserData, startCampaign } from '../../actions';
import * as styles from '../../css/material_styles';

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
  
  renderCampaignList(campaignListToRender, type){
    return campaignListToRender.map(function(object){
      return (
        <Link key={object._id} to={`/campaigns/${type}/${object._id}/roster`}>
          <ListItem style={styles.listItemStyle} primaryText={object.campaignName} />
        </Link>
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
          <h2 className='campaign-list'>Select A Campaign To Edit</h2>
          <List style={styles.listStyle}>
            {this.renderCampaignList(DMCampaigns, 'dm')}
          </List>
        </div>
      )
    }
  }

  renderPCCampaigns() {
    const { PCCampaigns } = this.props;
    if (PCCampaigns.length >= 1) {
      return (
        <div>
          <h2 className='campaign-list'>Select a Campaign To View</h2>
          <List style={styles.listStyle}>
            {this.renderCampaignList(PCCampaigns, 'pc')}
          </List>
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <div className='container'>
        <Paper zDepth={4} style={styles.paperStyle}>
          <h1 className='greeting'>Welcome {this.props.name}</h1>
          <div className='campaigns'>
            {this.renderDMCampaigns()}
            {this.renderPCCampaigns()}
          </div>
          <div className='campaign-add'>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div>
                <Field label='Campaign Name' name='name' component={this.renderField} />
              </div>
              <RaisedButton 
                labelStyle={styles.paperButtonStyle} 
                label='Start A New Campaign' 
                type='submit' />
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