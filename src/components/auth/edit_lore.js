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
        leftIcon={<ActionPermIdentity />} />
        {lore.backstory ? <ListItem style={styles.listItemStyle} primaryText={`History: ${lore.backstory}`} leftIcon={<ActionLabelOutline />} /> : '' }
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
            <Field label='History' name='backstory' component={this.renderField} />
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
    this.props.updateLore({values, id: lore._id, campaignId: id});
    this.props.reset();
  }

  render() {
    const { handleSubmit, params: { id, type, lore }} = this.props;
    return (
      <div>
        <CampaignNav index={3} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
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

function mapStateToProps(state) {
  return {
    campaign: state.user.Campaign
  }
}

export default reduxForm({
  form: 'edit_lore'
})(connect(mapStateToProps, { getCampaignData, updateLore })(EditLore));