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
import { getCampaignData, updateLore  } from '../../actions';
import * as styles from '../../css/material_styles';

class EditLore extends Component {
  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
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
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field type='textarea' label='History' name='backstory' component={this.renderField} />
          </div>
          <div>
            <Field label='Link To Image' name='image' component={this.renderField} />
          </div>
          <RaisedButton type='submit' label='Update Lore Item' />
          <Link to={`/campaigns/${type}/${id}/lore/${lore}/share`}>
            <RaisedButton style={styles.buttonStyle} primary={true} label='Share Lore Item' />
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

    const regex1 = /^(\s+)|(\s+)$/g;
    const regex2 = /\s{2,}/g;
    for (var value in values) {
      // replace all excess white space in front and end of string
      // replace excess white space in the middle of a string and replace with one empty space
      values[value] = values[value].replace(regex1, '').replace(regex2, ' ');
    }
    
    this.props.updateLore({values, id: lore._id, campaignId: id});
    this.props.reset();
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
                <RaisedButton primary={true} style={{marginTop: '10px'}} label='View notes' />
              </Link>
              <Link to={`/campaigns/${type}/${id}/lore`}>
                <RaisedButton secondary={true} style={{float: 'right', marginTop: '10px'}} label='Back to Lore Items' />
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

function mapStateToProps(state) {
  return {
    campaign: state.user.Campaign
  }
}

export default reduxForm({
  form: 'edit_lore',
  validate
})(connect(mapStateToProps, { getCampaignData, updateLore })(EditLore));