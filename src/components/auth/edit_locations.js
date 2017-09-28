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
import { getCampaignData, updateLocation, fetchLocation, resetInitialValues } from '../../actions';
import * as styles from '../../css/material_styles';

class EditLocation extends Component {
  componentWillMount() {
    const { id, type, location } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
    if(type === 'dm') {
      this.props.fetchLocation(id, location);
    }
  }

  componentWillUnmount() {
    this.props.resetInitialValues();
  }

  renderLocationData() {
    var location;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { location =_.find(campaign.locations, ['name', this.props.params.location]); }
    return (
      <List style={styles.listStyle}>
        <ListItem style={styles.listItemStyle} primaryText={`Location: ${location.name}`}
        leftIcon={<ActionPermIdentity />} disabled />
        {location.description ? <ListItem style={styles.listItemStyle} primaryText={`Description: ${location.description}`} leftIcon={<ActionLabelOutline />} disabled /> : '' }
        {location.history ? <ListItem style={styles.listItemStyle} primaryText={`History: ${location.history}`} leftIcon={<ActionDescription />} disabled /> : ''}
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
            <Field type='textarea' label='History' name='history' component={this.renderField} />
          </div>
          <div>
            <Field label='Link To Image' name='image' component={this.renderField} />
          </div>
          <RaisedButton 
            type='submit' 
            labelStyle={styles.paperButtonStyle} 
            label='Update Information' />
          <Link to={`/campaigns/${type}/${id}/locations/${location}/share`}>
            <RaisedButton 
              labelStyle={styles.paperButtonStyle} 
              style={styles.buttonStyle} 
              primary={true} 
              label='Share Location' />
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
    if (custom.type === 'textarea') {
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
          multiLine={true}
          rows={2}
          rowsMax={4}
          textareaStyle={styles.inputStye}
          {...input}
          {...custom}
        />
      );
    }
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
    
    const removeExcessWhiteSpace = /^(\s+)|(\s+)$/g;
    values.description = values.description.replace(removeExcessWhiteSpace, '');
    values.history = values.history.replace(removeExcessWhiteSpace, '');

    this.props.updateLocation({values, id: location._id, campaignId: id});
  }

  render() {
    const { handleSubmit, params: { id, type, location }} = this.props;
    return (
      <div>
        <CampaignNav index={2} />
        <div className='container'>
          <Paper style={styles.paperStyle} zDepth={4}>
            <h3>Location Details</h3>
            {this.renderLocationData()}
            {this.renderEditLocation()}
            <div>
              <Link to={`/campaigns/${type}/${id}/locations/${location}/notes`}>
                <RaisedButton 
                  primary={true} 
                  labelStyle={styles.paperButtonStyle} 
                  style={{marginTop: '10px'}} 
                  label='View notes' />
              </Link>
              <Link to={`/campaigns/${type}/${id}/locations`}>
                <RaisedButton
                  labelStyle={styles.paperButtonStyle}
                  secondary={true} 
                  style={{float: 'right', marginTop: '10px'}}
                  label='Back to Locations' />
              </Link>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const urlRegex= /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;
  const removeExcessWhiteSpace = /^(\s+)|(\s+)$/g;
  const errors = {};

  if(!values.description || values.description.replace(removeExcessWhiteSpace, '') === '') {
    errors.description = 'Location must have a description';
  }

  if(!values.history || values.history.replace(removeExcessWhiteSpace, '') === '') {
    errors.history = 'Location must have history';
  }

  if (values.image && !urlRegex.test(values.image)) {
    errors.image = 'Please enter a valid URL';
  }

  return errors;
}

EditLocation = reduxForm({
  form:'edit_location',
  validate
})(EditLocation)

EditLocation = connect(
  state => ({
    initialValues: state.user.currentFormItem,
    campaign: state.user.Campaign,
    enableReinintialize: true
  }), { getCampaignData, updateLocation, fetchLocation, resetInitialValues }
)(EditLocation)

export default EditLocation;