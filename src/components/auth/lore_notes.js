import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import CampaignNav from './campaign_nav';
import { getCampaignData, addLoreNote, editNote } from '../../actions';
import * as styles from '../../css/material_styles';

class LoreNotes extends Component {
  state = {
    editMode: false,
    note: '',
    id: ''
  }

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
    var self = this;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { lore =_.find(campaign.lore, ['title', this.props.params.lore]); }
    const notes = lore.notes;
    if (!notes) { return }
    else {
      return notes.map(function(object) {
        return (
          <ListItem onClick={() => self.onNoteClick(object)} style={styles.listItemStyle} key={object._id} primaryText={object.note}
          leftIcon={<ActionNoteAdd/>} />
        );
      });
    }
  }

  handleFormSubmit = ({ note }) => {
    if (this.state.editMode) {
      this.onEditClick(note);
      return;
    }
    const { type, id } = this.props.params;
    const removeExcessWhiteSpace = /^(\s+)|(\s+)$/g;
    note = note.replace(removeExcessWhiteSpace, '');
    const player = _.find(this.props.campaign.lore, ['title', this.props.params.lore]);
    this.props.addLoreNote({note, id: player._id, type, campaignId: id});
    this.props.reset();
  }

  onNoteClick(object) {
    this.setState({ editMode: true, note: object.note, id: object._id });
    this.props.dispatch(change('lore_notes', 'note', object.note));
  }

  onEditClick(note) {
    const { id } = this.state;
    const campaignId = this.props.params.id;
    const type = this.props.params.type.toUpperCase();
    const data = {
      id,
      campaignId,
      type,
      note,
      dbArray: 'lore',
    }
    this.onCancelClick();
    this.props.editNote(data);
  }

  onCancelClick() {
    this.props.dispatch(change('lore_notes', 'note', ''));
    this.setState({ editMode: false, note: '', id: '' });
    this.props.reset();
  }

  renderButtons() {
    const { lore, id, type } = this.props.params;
    if (!this.state.editMode) {
      return (
        <div>
          <RaisedButton labelStyle={styles.paperButtonStyle} type='submit' label='Add Note' />
          <Link to={`/campaigns/${type}/${id}/lore/${lore}`}>
            <RaisedButton labelStyle={styles.paperButtonStyle} secondary={true} style={styles.buttonStyle} 
            label={`Back to ${lore}`} />
          </Link>
        </div>
      )
    } else {
      return (
        <div>
          <RaisedButton labelStyle={styles.paperButtonStyle} type='submit' label='Edit Note' />
          <Link to={`/campaigns/${type}/${id}/lore/${lore}`}>
            <RaisedButton labelStyle={styles.paperButtonStyle} secondary={true} style={styles.buttonStyle} 
            label={`Back to ${lore}`} />
          </Link>
          <br />
          <br />
          <RaisedButton labelStyle={styles.paperButtonStyle} primary={true} label='Delete Note' />
          <RaisedButton
            onTouchTap={() => this.onCancelClick()}
            labelStyle={styles.paperButtonStyle} 
            style={styles.buttonStyle}
            label='Cancel' />
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, params: { lore }} = this.props;
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
              {this.renderButtons()}
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const removeExcessWhiteSpace = /^(\s+)|(\s+)$/g;
  const errors = {};
  if (!values.note || values.note.replace(removeExcessWhiteSpace, '') === '') {
    errors.note = 'Note cannot be blank';
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
})(connect(mapStateToProps, { getCampaignData, addLoreNote, editNote })(LoreNotes));