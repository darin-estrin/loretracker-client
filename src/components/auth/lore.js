import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, Paper, List, ListItem }  from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import { addLore, getCampaignData } from '../../actions'
import CampaignNav from './campaign_nav';
import * as styles from '../../css/material_styles';

class Lore extends Component {
  componentWillMount() {
    const { type, id } = this.props.params;
    this.props.getCampaignData(id, type);
  }

  addLoreSubmit = ({ title, backstory, image }) => {
    const { id } = this.props.params;
    this.props.addLore({ title, backstory, image, id });
    this.props.reset();
  }

  renderField({
    input,
    label,
    meta: {touched, error },
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
          textareaStyle={{color:grey900}}
          {...input}
          {...custom}
        />
      );
    }
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

  renderAddLoreItem() {
    const { handleSubmit } = this.props;
    if (this.props.params.type === 'dm') {
      return (
        <form onSubmit={handleSubmit(this.addLoreSubmit)}>
          <div>
            <Field label='Lore Item' name='title' component={this.renderField} />
          </div>
          <div>
            <Field type='textarea' label='History' name='backstory' component={this.renderField} />
          </div>
          <div>
            <Field label='Link to image' name='image' component={this.renderField} />
          </div>
          {this.renderAlert()}
          <RaisedButton labelStyle={styles.paperButtonStyle} type='submit' label='Add Lore Item' />
          <Link to='/campaigns'>
            <RaisedButton labelStyle={styles.paperButtonStyle} style={styles.buttonStyle} label='Back to Campaigns' 
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

  renderLoreItems() {
    const { campaign, params:{ type, id }}  = this.props;
    if (!campaign) { return; }
    const lore = campaign.lore
    if (type === 'pc' && lore.length < 1) {
      return (
        <h2 className='notes-header'>No lore items have been shared with you yet</h2>
      );
    }
    return lore.map(function(object){
      return (
        <Link to={`/campaigns/${type}/${id}/lore/${object.title}`} key={object._id}>
          <ListItem style={styles.listItemStyle} primaryText={object.title} 
            secondaryText={!object.backstory ? '' : object.backstory}
          />
        </Link>
      );
    });
   }

  render() {
    return (
      <div>
        <CampaignNav index={3} />
        <div className='container'>
          <Paper style={styles.paperStyle} zDepth={4}>
            {!this.props.campaign ? '' : <h2>{this.props.campaign.campaignName}</h2>}
            <List style={styles.listStyle}>
            <h2 className='notes-header'>Lore</h2>
            {this.renderLoreItems()}
            </List>
            {this.renderAddLoreItem()}
          </Paper>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const urlRegex= /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;
  const errors = {};

  if(!values.title) {
    errors.title = 'Lore item must have a name';
  }

  if (values.image && !urlRegex.test(values.image)) {
    errors.image = 'Please enter a valid URL';
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
  form: "add_lore",
  validate
})(connect(mapStateToProps, { addLore, getCampaignData})(Lore));;