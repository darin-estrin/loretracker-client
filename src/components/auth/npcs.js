import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, Paper, List, ListItem }  from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import { addNPC, getCampaignData } from '../../actions'
import CampaignNav from './campaign_nav';
import * as styles from '../../css/material_styles';

class Npcs extends Component {
  componentWillMount() {
    const { type, id } = this.props.params;
    this.props.getCampaignData(id, type);
  }

  addNpcSubmit = ({ name,  image, bio, description }) => {
    const { id } = this.props.params;
    this.props.addNPC({ name, image, id, bio, description});
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

  renderAddNpc() {
    const { handleSubmit } = this.props;
    if (this.props.params.type === 'dm') {
      return (
        <form onSubmit={handleSubmit(this.addNpcSubmit)}>
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
            <Field label='Link to image' name='image' component={this.renderField} />
          </div>
          {this.renderAlert()}
          <RaisedButton type='submit' label='Add NPC' />
          <Link to='/campaigns'>
            <RaisedButton style={styles.buttonStyle} label='Back to Campaigns' 
              secondary={true}
            />
          </Link>
        </form>
      );
    }
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

  renderNpcs() {
    const { campaign, params:{ type, id }}  = this.props;
    if (!campaign) { return; }
    const npcs = campaign.NPCs
    return npcs.map(function(object){
      return (
        <Link to={`/campaigns/${type}/${id}/npcs/${object.name}`} key={object._id}>
          <ListItem style={styles.listItemStyle} primaryText={object.name} 
            secondaryText={!object.description ? '' : object.description}
          />
        </Link>
      );
    });
   }

  render() {
    return (
      <div>
        <CampaignNav index={1} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
            {!this.props.campaign ? '' : <h2>{this.props.campaign.campaignName}</h2>}
            <List style={styles.listStyle}>
            <h2 className='notes-header'>NPCs</h2>
            {this.renderNpcs()}
            </List>
            {this.renderAddNpc()}
          </Paper>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.name) {
    errors.name = 'NPC must have a name';
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
  form: "add_npc",
  validate
})(connect(mapStateToProps, { addNPC, getCampaignData})(Npcs));