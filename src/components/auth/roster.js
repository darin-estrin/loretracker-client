import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, Paper, List, ListItem, Dialog }  from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { addPlayer, getCampaignData, deleteCampaign, leaveCampaign } from '../../actions';
import CampaignNav from './campaign_nav';
import * as styles from '../../css/material_styles';

class Roster extends Component {
  state = {
    open: false
  }
  
  componentWillMount() {
    const { type, id } = this.props.params;
    this.props.getCampaignData(id, type);
  }

  addPlayerSubmit = ({ email, name }) => {
    const { id } = this.props.params;
    this.props.addPlayer({ email, campaignId: id, name });
    this.props.reset();
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
    meta: {touched, error },
    ...custom
  }) {
    return(
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

  handleDeleteCampaign = () => {
    this.props.deleteCampaign(this.props.campaign);
    this.handleClose();
  }

  handleLeaveCampaign = () => {
    this.props.leaveCampaign(this.props.campaign);
    this.handleClose();
  }

  renderAddPlayer() {
    const { handleSubmit } = this.props;
    const deleteCampaign = [
      <RaisedButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Confirm"
        secondary={true}
        onTouchTap={this.handleDeleteCampaign}
      />,
    ];
    return (
      <div>
        <form onSubmit={handleSubmit(this.addPlayerSubmit)}>
          <div>
            <Field label='Player Email' name='email' component={this.renderField} />
          </div>
          <div>
            <Field label='Character Name' name='name' component={this.renderField} />
          </div>
          {this.renderAlert()}
          <RaisedButton label='Add Player' type='submit' />
          <Link to='/campaigns'>
            <RaisedButton style={styles.buttonStyle} label='Back to Campaigns' 
              primary={true}
            />
          </Link>
        </form>
        <RaisedButton style={{float: 'right', marginTop: '10px'}} secondary={true} 
        onTouchTap={this.handleOpen} label='Delete Campaign' />
        <Dialog
        title="Warning!"
        actions={deleteCampaign}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        This will permanently delete the campaign.
      </Dialog>
      </div>
    );
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      )
    }
  }

  renderPlayers() {
    const { campaign, params: { id, type }}  = this.props;
    if (!campaign) { return; }
    const players = campaign.players
    return players.map(function(object){
      return (
        <Link key={object._id} to={`/campaigns/${type}/${id}/roster/${object.characterName}`}>
          <ListItem style={styles.listItemStyle} primaryText={object.name}
            secondaryText={!object.characterName ? '' : object.characterName}
          />
        </Link>
      );
    });
  }

  render() {
    const {id, type} = this.props.params;
    const leaveCampaign = [
      <RaisedButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Confirm"
        secondary={true}
        onTouchTap={this.handleLeaveCampaign}
      />,
    ];
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <Paper style={{display: 'flex', backgroundColor:'none', width: '100%'}} zDepth={4}>
            <Paper style={styles.paperStyle}>
              {!this.props.campaign ? '' : <h2>{this.props.campaign.campaignName}</h2>}
                <List style={styles.listStyle}>
                  <h2 className='notes-header'>Players</h2>
                  {this.renderPlayers()}
                </List>
                {this.props.params.type ==='dm' ? this.renderAddPlayer() : 
                <div>
                  <RaisedButton label='Leave Campaign' style={{marginTop: '10px'}} secondary={true}   onTouchTap={this.handleOpen} />
                  <Link to='/campaigns'>
                    <RaisedButton style={{float:'right', marginTop: '10px'}} label='Back to Campaigns' primary={true} />
                  </Link>
                  <Dialog
                  title="Warning!"
                  actions={leaveCampaign}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  This will permanently remove you from the campaign.
                </Dialog>
                </div>}
            </Paper>
          </Paper>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please Enter an email address';
  }

  if (!formProps.name) {
    errors.name = 'Please enter a name for the Character';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    campaign: state.user.Campaign,
    errorMessage: state.user.error
  }
}

export default reduxForm({
  form: 'add_player',
  validate
})(connect(mapStateToProps, {
  addPlayer,
  getCampaignData,
  deleteCampaign,
  leaveCampaign
})(Roster));