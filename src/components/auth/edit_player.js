import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900, grey800 } from 'material-ui/styles/colors';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationPhone from 'material-ui/svg-icons/communication/phone';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import ActionDescription from 'material-ui/svg-icons/action/description';
import CampaignNav from './campaign_nav';
import { getCampaignData, updatePlayer } from '../../actions';
require('../../css/edit_player.scss');

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
  flexDirection: 'column',
  marginTop: '5vh',
  flex: 1
}

const listItemStyle = {
  fontSize: '2vmax'
}

const listStyle = {
  backgroundColor: grey800
}

class EditPlayer extends Component {
  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
  }

  renderPlayerData() {
    var player;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { player =_.find(campaign.players, ['characterName', this.props.params.player]); }
    return (
      <List style={listStyle}>
        <ListItem style={listItemStyle} primaryText={`Character: ${player.characterName}`}
        leftIcon={<ActionLabelOutline />} />
        <ListItem style={listItemStyle} primaryText={`Name: ${player.name}`} leftIcon={<ActionPermIdentity/>} />
        <ListItem style={listItemStyle} primaryText={`Email: ${player.email}`} leftIcon={<CommunicationEmail/>} />
        {player.phone ? <ListItem style={listItemStyle} primaryText={`Phone: ${player.phone}`} leftIcon={<CommunicationPhone />} /> : ''}
        {player.description ? <ListItem style={listItemStyle} primaryText={`Description: ${player.description}`} leftIcon={<ActionDescription />} /> : ''}
        {player.image ? <img className='character-image' src={player.image} /> : '' }
      </List>
    );
  }

  renderField({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) {
    return (
      <TextField
        hintText={label === 'Phone Number' ? '555-555-5555' : label}
        hintStyle={{color:grey900}}
        floatingLabelText={label}
        floatingLabelFocusStyle={{color:'#0097A7'}}
        underlineStyle={styles.underlineStyle}
        floatingLabelStyle={styles.floatingLabelStyle}
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
    const player = _.find(this.props.campaign.players, ['characterName', this.props.params.player]);
    this.props.updatePlayer({values, id: player._id, type, campaignId: id});
    this.props.reset();
  }

  render() {
    const { handleSubmit, params: { id, type, player }} = this.props;
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <Paper style={paperStyle}>
            <h3>Player Details</h3>
            {this.renderPlayerData()}
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div>
                <Field label='Phone Number' name='phone' component={this.renderField} />
              </div>
              <div>
                <Field label='Link to Image' name='image' component={this.renderField} />
              </div>
              <div>
                <Field label='Description' name='description' component={this.renderField} />
              </div>
              <RaisedButton type='submit' label='Update Information' />
            </form>
            <div>
              <Link to={`/campaigns/${type}/${id}/roster/${player}/notes`}>
                <RaisedButton primary={true} style={{marginTop: '10px'}} label='Add a note' />
              </Link>
              <Link to={`/campaigns/${type}/${id}/roster`}>
                <RaisedButton secondary={true} style={{float: 'right', marginTop: '10px'}} label='Back to Players' />
              </Link>
            </div>
          </Paper>
        </div>
      </div>
      
    );
  }
}

function validate(values) {
  const { phone, description, image } = values;
  const errors = {};
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  
  if (!phoneRegex.test(phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!phone) {
    errors.phone = null;
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    campaign: state.user.Campaign
  }
}

export default reduxForm({
  form: 'edit_player',
  enableReinitialize: true,
  validate
})(connect(mapStateToProps, { getCampaignData, updatePlayer })(EditPlayer));