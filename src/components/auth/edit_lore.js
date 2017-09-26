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
import { getCampaignData, updateLore, fetchLoreItem, resetInitialValues } from '../../actions';
import * as styles from '../../css/material_styles';

class EditLore extends Component {
  componentWillMount() {
    const { id, type, lore } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
    if(type === 'dm') {
      this.props.fetchLoreItem(id, lore);
    }
  }

  componentWillUnmount() {
    this.props.resetInitialValues();
  }

  renderLoreData() {
    var lore;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { lore =_.find(campaign.lore, ['title', this.props.params.lore]); }
    return (
      <List style={styles.listStyle}>
        <ListItem style={styles.listItemStyle} primaryText={`Title: ${lore.title}`}
        leftIcon={<ActionPermIdentity />} disabled />
        {lore.backstory ? <ListItem style={styles.listItemStyle} primaryText={`History: ${lore.backstory}`} leftIcon={<ActionLabelOutline />} disabled /> : '' }
        {lore.image ? <img className='character-image' src={lore.image} /> : '' }
      </List>
    );
  }

  renderEditLore() {
    const { handleSubmit , params: { id, type, lore }} = this.props;
    if (type === 'dm') {
      return (
        <form onSubmit={handleSubmit(this.handleFormSubmit)} >
          <div>
            <Field type='textarea' label='History' name='backstory' component={this.renderField} />
          </div>
          <div>
            <Field label='Link To Image' name='image' component={this.renderField} />
          </div>
          <RaisedButton labelStyle={styles.paperButtonStyle} type='submit' label='Update Lore Item' />
          <Link to={`/campaigns/${type}/${id}/lore/${lore}/share`}>
            <RaisedButton labelStyle={styles.paperButtonStyle} style={styles.buttonStyle} primary={true} label='Share Lore Item' />
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
    const lore = _.find(this.props.campaign.lore, ['title', this.props.params.lore]);

    const removeExcessWhiteSpace = /^(\s+)|(\s+)$/g;
    values.title = values.title.replace(removeExcessWhiteSpace, '');
    
    this.props.updateLore({values, id: lore._id, campaignId: id});
  }

  render() {
    const { handleSubmit, params: { id, type, lore }} = this.props;
    return (
      <div>
        <CampaignNav index={3} />
        <div className='container'>
          <Paper style={styles.paperStyle} zDepth={4}>
            <h3>Lore Details</h3>
            {this.renderLoreData()}
            {this.renderEditLore()}
            <div>
              <Link to={`/campaigns/${type}/${id}/lore/${lore}/notes`}>
                <RaisedButton labelStyle={styles.paperButtonStyle} primary={true} style={{marginTop: '10px'}} label='View notes' />
              </Link>
              <Link to={`/campaigns/${type}/${id}/lore`}>
                <RaisedButton labelStyle={styles.paperButtonStyle} secondary={true} style={{float: 'right', marginTop: '10px'}} label='Back to Lore Items' />
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
  const errors = {};

  if (values.image && !urlRegex.test(values.image)) {
    errors.image = 'Please enter a valid URL';
  }

  return errors;
}

EditLore = reduxForm({
  form: 'edit_lore',
  validate
})(EditLore)

EditLore = connect(
  state => ({
    initialValues: state.user.currentFormItem,
    campaign: state.user.Campaign,
    enableReinintialize: true
  }), { getCampaignData, updateLore, fetchLoreItem, resetInitialValues }
)(EditLore)

export default EditLore;