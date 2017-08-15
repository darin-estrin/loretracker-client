import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TextField, RaisedButton, Paper, List, ListItem, Dialog } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationPhone from 'material-ui/svg-icons/communication/phone';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import ActionDescription from 'material-ui/svg-icons/action/description';
import CampaignNav from './campaign_nav';
import { getCampaignData, updatePlayer, deletePlayer } from '../../actions';
import * as styles from '../../css/material_styles';


class EditPlayer extends Component {
  state = {
    open: false
  }

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
      <List style={styles.listStyle}>
        <ListItem style={styles.listItemStyle} primaryText={`Character: ${player.characterName}`}
        leftIcon={<ActionLabelOutline />} disabled />
        <ListItem style={styles.listItemStyle} primaryText={`Name: ${player.name}`} leftIcon={<ActionPermIdentity/>} disabled />
        {player.phone ? <ListItem style={styles.listItemStyle} primaryText={`Phone: ${player.phone}`} leftIcon={<CommunicationPhone />} disabled /> : ''}
        {player.description ? <ListItem style={styles.listItemStyle} primaryText={`Description: ${player.description}`} leftIcon={<ActionDescription />} disabled /> : ''}
        {player.image ? <img className='character-image' src={player.image} /> : '' }
      </List>
    );
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  renderField({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) {
    return (
      <TextField
        hintText={label === 'Phone Number' ? '5555555555' : label}
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

  handleFormSubmit = (values) => {
    const { type, id } = this.props.params;
    const player = _.find(this.props.campaign.players, ['characterName', this.props.params.player]);
    
    const regex1 = /^(\s+)|(\s+)$/g;
    for (var value in values) {
      // replace all excess white space in front and end of string
      // replace excess white space in the middle of a string and replace with one empty space
      values[value] = values[value].replace(regex1, '');
    }

    this.props.updatePlayer({values, id: player._id, type, campaignId: id});
    this.props.reset();
  }

  handleDelete = () => {
    const { campaign, params: { id, type } } = this.props;
    const player =_.find(campaign.players, ['characterName', this.props.params.player]);
    this.props.deletePlayer(campaign, player, id, type);
    this.handleClose();
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Confirm"
        secondary={true}
        onTouchTap={this.handleDelete}
      />,
    ];

    const { handleSubmit, params: { id, type, player }} = this.props;
    
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <Paper style={styles.paperStyle} zDepth={4}>
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
              {this.props.params.type == 'dm' ? 
                <RaisedButton label='Delete Player' 
                  onTouchTap={this.handleOpen} style={{float: 'right'}} /> : ''  }
            </form>
            <div>
              <Link to={`/campaigns/${type}/${id}/roster/${player}/notes`}>
                <RaisedButton primary={true} style={{marginTop: '10px'}} label='View notes' />
              </Link>
              <Link to={`/campaigns/${type}/${id}/roster`}>
                <RaisedButton secondary={true} style={{float: 'right', marginTop: '10px'}} label='Back to Players' />
                <Dialog
                title="Warning!"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                This will permanently delete the player from the campaign.
              </Dialog>
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
  const urlRegex= /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;
  
  if (phone && !phoneRegex.test(phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (image && !urlRegex.test(image)) {
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
  form: 'edit_player',
  validate
})(connect(mapStateToProps, { getCampaignData, updatePlayer, deletePlayer })(EditPlayer));