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
    const { id, type } = this.props.params;
    this.props.getCampaignData(id, type);
  }

  renderPlayerData() {
    var player;
    const { campaign } = this.props;
    if (!campaign) {
     return;
    } else {
       player =_.find(campaign.players, ['characterName', this.props.params.player]);
    }
    return (
      <List style={listStyle}>
        <ListItem style={listItemStyle} primaryText={`Character: ${player.characterName}`}
        leftIcon={<ActionLabelOutline />} />
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
    if (custom.type === 'textarea') {
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
          rowsMax={2}
          textareaStyle={{color:grey900}}
          {...input}
          {...custom}
        />
      );
    } else {
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
  }

  renderDMForm() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleDMFormSubmit)}>
        <div>
          <Field label='Phone Number' name='phone' component={this.renderField} />
        </div>
        <RaisedButton type='submit' label='Update Information' />
      </form>
    );
  }

  handleDMFormSubmit = (values) => {
    const { type, id } = this.props.params;
    const player = _.find(this.props.campaign.players, ['characterName', this.props.params.player]);
    this.props.updatePlayer({values, id: player._id, type, campaignId: id});
    this.props.reset();
  }

  renderPCForm = () => {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handlePCFormSubmit)}>
        <div>
          <Field label='Phone Number' name='phone' component={this.renderField} />
        </div>
        <div>
          <Field label='Link to Image' name='image' component={this.renderField} />
        </div>
        <div>
          <Field type='textarea' label='Description'
          name='description' component={this.renderField} />
        </div>
        <RaisedButton type='submit' label='Update Information' />
      </form>
    );
  }

  handlePCFormSubmit = (values) => {

  }

  render() {
    const { id, type, player } = this.props.params;
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <Paper style={paperStyle}>
            {this.getPlayerImage()}
            <h3>Player Details</h3>
            {this.renderPlayerData()}
            {type === 'dm' ? this.renderDMForm() : this.renderPCForm()}
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
  const { phone, note } = values;
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
    campaign: state.user.Campaign,
    initialValues: { phone: '111-111-1111' }
  }
}

export default reduxForm({
  form: 'edit_player',
  enableReinitialize: true,
  validate
})(connect(mapStateToProps, { getCampaignData, updatePlayer })(EditPlayer));