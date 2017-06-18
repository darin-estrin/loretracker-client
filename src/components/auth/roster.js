import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, Paper, List, ListItem }  from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { addPlayer, getCampaignData } from '../../actions';
import CampaignNav from './campaign_nav';
import * as styles from '../../css/material_styles';

class Roster extends Component {  
  componentWillMount() {
    const { type, id } = this.props.params;
    this.props.getCampaignData(id, type);
  }

  addPlayerSubmit = ({ email, name }) => {
    const { id } = this.props.params;
    this.props.addPlayer({ email, campaignId: id, name });
    this.props.reset();
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
          inputStyle={{color:grey900}}
          {...input}
          {...custom}
      />
    );
  }

  renderAddPlayer() {
    const { handleSubmit } = this.props;
    return (
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
            secondary={true}
          />
        </Link>
      </form>
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
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <Paper style={{display: 'flex', backgroundColor:'none', width: '100%'}}>
            <Paper style={styles.paperStyle}>
              {!this.props.campaign ? '' : <h2>{this.props.campaign.campaignName}</h2>}
                <h2>Players</h2>
                <List style={styles.listStyle}>
                  {this.renderPlayers()}
                </List>
                {this.props.params.type ==='dm' ? this.renderAddPlayer() : 
                <Link to='/campaigns'>
                  <RaisedButton style={{float:'right', marginTop: '10px'}} label='Back to Campaigns' secondary={true}/>
                </Link>}
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
  getCampaignData
})(Roster));