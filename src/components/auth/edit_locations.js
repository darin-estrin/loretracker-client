import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import ActionDescription from 'material-ui/svg-icons/action/description';
import CampaignNav from './campaign_nav';
import { getCampaignData, updateLocation  } from '../../actions';
import * as styles from '../../css/material_styles';

class EditLocation extends Component {
  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
  }

  renderLocationData() {
    var location;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { location =_.find(campaign.locations, ['name', this.props.params.location]); }
    return (
      <List style={styles.listStyle}>
        <ListItem style={styles.listItemStyle} primaryText={`Location: ${location.name}`}
        leftIcon={<ActionPermIdentity />} />
        {location.description ? <ListItem style={styles.listItemStyle} primaryText={`Description: ${location.description}`} leftIcon={<ActionLabelOutline />} /> : '' }
        {location.history ? <ListItem style={styles.listItemStyle} primaryText={`History: ${location.history}`} leftIcon={<ActionDescription />} /> : ''}
        {location.image ? <img className='character-image' src={location.image} /> : '' }
      </List>
    );
  }

  renderEditLocation() {
    const { handleSubmit , params: { id, type, location }} = this.props;
    if (type === 'dm') {
      return (
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field label='Description' name='description' component={this.renderField} />
          </div>
          <div>
            <Field label='History' name='history' component={this.renderField} />
          </div>
          <div>
            <Field label='Link To Image' name='image' component={this.renderField} />
          </div>
          <RaisedButton type='submit' label='Update Information' />
          <Link to={`/campaigns/${type}/${id}/locations/${location}/share`}>
            <RaisedButton style={styles.buttonStyle} primary={true} label='Share Location' />
          </Link>
        </form>
      );
    }
  }

  renderField({
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
        underlineStyle={styles.styles.underlineStyle}
        floatingLabelStyle={styles.styles.floatingLabelStyle}
        errorText={touched && error}
        fullWidth
        inputStyle={{color:grey900}}
        {...input}
        {...custom}
      />
    );
  }

  handleFormSubmit = (values) => {
    const { type, id } = this.props.params;
    const location = _.find(this.props.campaign.locations, ['name', this.props.params.location]);
    this.props.updateLocation({values, id: location._id, campaignId: id});
    this.props.reset();
  }

  render() {
    const { handleSubmit, params: { id, type, location }} = this.props;
    return (
      <div>
        <CampaignNav index={2} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
            <h3>Location Details</h3>
            {this.renderLocationData()}
            {this.renderEditLocation()}
            <div>
              <Link to={`/campaigns/${type}/${id}/locations/${location}/notes`}>
                <RaisedButton primary={true} style={{marginTop: '10px'}} label='View notes' />
              </Link>
              <Link to={`/campaigns/${type}/${id}/locations`}>
                <RaisedButton secondary={true} style={{float: 'right', marginTop: '10px'}} label='Back to Locations' />
              </Link>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.user.Campaign
  }
}

export default reduxForm({
  form: 'edit_location'
})(connect(mapStateToProps, { getCampaignData, updateLocation })(EditLocation));