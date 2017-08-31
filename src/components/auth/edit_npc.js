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
import { getCampaignData, updateNPC  } from '../../actions';
import * as styles from '../../css/material_styles';

class EditNpc extends Component {
  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
  }

  renderNpcData() {
    var npc;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { npc =_.find(campaign.NPCs, ['name', this.props.params.npc]); }
    return (
      <List style={styles.listStyle}>
        <ListItem style={styles.listItemStyle} primaryText={`Character: ${npc.name}`}
        leftIcon={<ActionPermIdentity />} disabled />
        {npc.description ? <ListItem style={styles.listItemStyle} primaryText={`Description: ${npc.description}`} leftIcon={<ActionLabelOutline />} disabled /> : '' }
        {npc.bio ? <ListItem style={styles.listItemStyle} primaryText={`Bio: ${npc.bio}`} leftIcon={<ActionDescription />} disabled /> : ''}
        {npc.image ? <img className='character-image' src={npc.image} /> : '' }
      </List>
    );
  }

  renderEditNpc() {
    const { handleSubmit , params: { id, type, npc }} = this.props;
    if (type === 'dm') {
      return (
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field label='Description' name='description' component={this.renderField} />
          </div>
          <div>
            <Field type='textarea' label='Bio' name='bio' component={this.renderField} />
          </div>
          <div>
            <Field label='Link To Image' name='image' component={this.renderField} />
          </div>
          <RaisedButto labelStyle={styles.paperButtonStyle} type='submit' label='Update Information' />
          <Link to={`/campaigns/${type}/${id}/npcs/${npc}/share`}>
            <RaisedButton labelStyle={styles.paperButtonStyle} style={styles.buttonStyle} primary={true} label='Share NPC' />
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
    const npc = _.find(this.props.campaign.NPCs, ['name', this.props.params.npc]);

    const regex1 = /^(\s+)|(\s+)$/g;
    for (var value in values) {
      // replace all excess white space in front and end of string
      // replace excess white space in the middle of a string and replace with one empty space
      values[value] = values[value].replace(regex1, '');
    }
    
    this.props.updateNPC({values, id: npc._id, campaignId: id});
    this.props.reset();
  }

  render() {
    const { handleSubmit, params: { id, type, npc }} = this.props;
    return (
      <div>
        <CampaignNav index={1} />
        <div className='container'>
          <Paper style={styles.paperStyle} zDepth={4}>
            <h3>NPC Details</h3>
            {this.renderNpcData()}
            {this.renderEditNpc()}
            <div>
              <Link to={`/campaigns/${type}/${id}/npcs/${npc}/notes`}>
                <RaisedButton labelStyle={styles.paperButtonStyle} primary={true} style={{marginTop: '10px'}} label='View notes' />
              </Link>
              <Link to={`/campaigns/${type}/${id}/npcs`}>
                <RaisedButton labelStyle={styles.paperButtonStyle} secondary={true} style={{float: 'right', marginTop: '10px'}} label='Back to NPCs' />
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
  form: 'edit_npc',
  validate
})(connect(mapStateToProps, { getCampaignData, updateNPC })(EditNpc));