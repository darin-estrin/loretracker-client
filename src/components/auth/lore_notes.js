import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import CampaignNav from './campaign_nav';
import { getCampaignData, addLoreNote } from '../../actions';
import * as styles from '../../css/material_styles';

class LoreNotes extends Component {
  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
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
        hintText='Notes will always be private to you'
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

  renderLoreNotes() {
    var lore;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { lore =_.find(campaign.lore, ['title', this.props.params.lore]); }
    const notes = lore.notes;
    if (!notes) { return }
    else {
      return notes.map(function(object) {
        return (
          <ListItem style={styles.listItemStyle} key={object._id} primaryText={object.note}
          leftIcon={<ActionNoteAdd/>} />
        );
      });
    }
  }

  handleFormSubmit = ({ note }) => {
    const { type, id } = this.props.params;
    const player = _.find(this.props.campaign.lore, ['title', this.props.params.lore]);
    this.props.addLoreNote({note, id: player._id, type, campaignId: id});
    this.props.reset();
  }

  render() {
    const { handleSubmit, params: { type, id, lore }} = this.props;
    return(
      <div>
        <CampaignNav index={3} />
        <div className='container'>
          <Paper style={styles.paperStyle} zDepth={4}>
            <List style={styles.listStyle}>
              <h3 className='notes-header'>Notes for {lore}</h3>
              {this.renderLoreNotes()}
            </List>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div>
                <Field label='Add a note' name='note' component={this.renderField} />
              </div>
              <RaisedButton type='submit' label='Add Note' />
              <Link to={`/campaigns/${type}/${id}/lore/${lore}`}>
                <RaisedButton secondary={true} style={styles.buttonStyle} 
                label={`Back to ${lore}`} />
              </Link>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {}

  if (!values.note) {
    errors.note = 'Note cannot be empty'
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    campaign: state.user.Campaign
  }
}

export default reduxForm({
  form: 'lore_notes',
  validate
})(connect(mapStateToProps, { getCampaignData, addLoreNote })(LoreNotes));