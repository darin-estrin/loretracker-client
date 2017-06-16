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
import CampaignNav from './campaign_nav';
import { getCampaignData, updatePlayer } from '../../actions';

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
    const { type, id } = this.props.params;
    if (type === 'dm') {
      this.props.getCampaignData(id, type);
    } else if (type === 'pc') {
      this.props.getCampaignData(this.props.params.id, type);
    }   
  }

  renderPlayerData() {
    var player;
    if (!this.props.campaign) {
     return;
    } else {
       player =_.find(this.props.campaign.players, ['characterName', this.props.params.player]);
    }
    return (
      <List style={listStyle}>
        <ListItem style={listItemStyle} primaryText={`Name: ${player.name}`} leftIcon={<ActionPermIdentity/>} />
        <ListItem style={listItemStyle} primaryText={`Email: ${player.email}`} leftIcon={<CommunicationEmail/>} />
        {player.phone ? <ListItem style={listItemStyle} primaryText={`Phone: ${player.phone}`} leftIcon={<CommunicationPhone />} /> : ''}
      </List>
    );
  }

  getPlayerImage() {

  }

  renderField({
    input,
    label,
    meta: { touched, error },
    ...custom
  }, field) {
    if (field.type === 'textarea') {
      return (
        <TextField
          hintText={label} hintStyle={{color:grey900}}
          floatingLabelText={label}
          floatingLabelFocusStyle={{color:'#0097A7'}}
          underlineStyle={styles.underlineStyle}
          floatingLabelStyle={styles.floatingLabelStyle}
          errorText={touched && error}
          fullWidth
          multiLine={true}
          rows={2}
          maxRows={4}
          inputStyle={{color:grey900}}
          {...input}
          {...custom}
        />
      );
    } else {
      return (
        <TextField
          hintText={label === 'Phone Number' ? '1(555)555-5555' : label}
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
  }

  renderDMForm() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleDMFormSubmit)}>
        <div>
          <Field label='Phone Number' name='phone' component={this.renderField} />
        </div>
        <RaisedButton type='submit' label='Submit' />
      </form>
    );
  }

  handleDMFormSubmit = (values) => {
    const { type, id } = this.props.params;
    const player = _.find(this.props.campaign.players, ['characterName', this.props.params.player]);
    this.props.updatePlayer({values, id: player._id, type, campaignId: id});
  }

  renderPCForm = () => {
    
  }

  render() {
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <Paper style={paperStyle}>
            <h1>{this.props.params.player}</h1>
            {this.getPlayerImage()}
            {this.renderPlayerData()}
            {this.props.params.type === 'dm' ? this.renderDMForm() : this.renderPCForm()}
          </Paper>
        </div>
      </div>
      
    );
  }
}

function validate(values) {
  const { phone } = values;
  const errors = {};
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  
  if (!phoneRegex.test(phone)) {
    errors.phone = 'Please Enter A Valid Phone Number';
  }

  if (!phone) {
    errors.phone = 'Please Enter A Phone Number'
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
})(connect(mapStateToProps, { getCampaignData, updatePlayer })(EditPlayer));