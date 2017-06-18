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
import { getCampaignData  } from '../../actions';
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
        leftIcon={<ActionPermIdentity />} />
        {npc.description ? <ListItem style={styles.listItemStyle} primaryText={`Description: ${npc.description}`} leftIcon={<ActionLabelOutline />} /> : '' }
        {npc.bio ? <ListItem style={styles.listItemStyle} primaryText={`Bio: ${npc.bio}`} leftIcon={<ActionDescription />} /> : ''}
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
            <Field label='Character Name' name='name' component={this.renderField} />
          </div>
          <div>
            <Field label='Description' name='description' component={this.renderField} />
          </div>
          <div>
            <Field label='Bio' name='bio' component={this.renderField} />
          </div>
          <div>
            <Field label='Link To Image' name='image' component={this.renderField} />
          </div>
          <RaisedButton type='submit' label='Update Information' />
          <Link to={`/campaigns/${type}/${id}/npcs/${npc}/share`}>
            <RaisedButton style={styles.buttonStyle} primary={true} label='Share NPC' />
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
    const npc = _.find(this.props.campaign.NPCs, ['characterName', this.props.params.npc]);
    //this.props.updatePlayer({values, id: npc._id, type, campaignId: id});
    this.props.reset();
  }

  render() {
    const { handleSubmit, params: { id, type, npc }} = this.props;
    return (
      <div>
        <CampaignNav index={1} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
            <h3>NPC Details</h3>
            {this.renderNpcData()}
            {this.renderEditNpc()}
            <div>
              <Link to={`/campaigns/${type}/${id}/roster/${npc}/notes`}>
                <RaisedButton primary={true} style={{marginTop: '10px'}} label='Add a note' />
              </Link>
              <Link to={`/campaigns/${type}/${id}/npcs`}>
                <RaisedButton secondary={true} style={{float: 'right', marginTop: '10px'}} label='Back to NPCs' />
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
  form: 'edit_player'
})(connect(mapStateToProps, { getCampaignData })(EditNpc));