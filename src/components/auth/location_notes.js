import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import CampaignNav from './campaign_nav';
import { getCampaignData, addLocationNote, editNote } from '../../actions';
import * as styles from '../../css/material_styles';

class LocationNotes extends Component {
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

  renderLocationNotes() {
    var location;
    var self = this;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { location =_.find(campaign.locations, ['name', this.props.params.location]); }
    const notes = location.notes;
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
    const player = _.find(this.props.campaign.locations, ['name', this.props.params.location]);
    this.props.addLocationNote({note, id: player._id, type, campaignId: id});
    this.props.reset();
  }

  onNoteClick(object) {
    this.setState({ editMode: true, note: object.note, id: object._id });
    this.props.dispatch(change('location_notes', 'note', object.note));
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
      dbArray: 'locations',
    }
    this.onCancelClick();
    this.props.editNote(data);
  }

  onCancelClick() {
    this.props.dispatch(change('location_notes', 'note', ''));
    this.setState({ editMode: false, note: '', id: '' });
    this.props.reset();
  }

  renderButtons() {
    const { type, id, location } = this.props.params;
    if (!this.state.editMode) {
      return (
        <div>
          <RaisedButton labelStyle={styles.paperButtonStyle} type='submit' label='Add Note' />
          <Link to={`/campaigns/${type}/${id}/locations/${location}`}>
            <RaisedButton labelStyle={styles.paperButtonStyle} secondary={true} style={styles.buttonStyle} 
            label={`Back to ${location}`} />
          </Link>
        </div>
      )
    } else { 
      return (
        <div>
          <RaisedButton labelStyle={styles.paperButtonStyle} type='submit' label='Edit Note' />
          <Link to={`/campaigns/${type}/${id}/locations/${location}`}>
            <RaisedButton labelStyle={styles.paperButtonStyle} secondary={true} style={styles.buttonStyle} 
            label={`Back to ${location}`} />
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
    const { handleSubmit, params: { location }} = this.props;
    return(
      <div>
        <CampaignNav index={2} />
        <div className='container'>
          <Paper style={styles.paperStyle} zDepth={4}>
            <List style={styles.listStyle}>
              <h3 className='notes-header'>Notes for {location}</h3>
              {this.renderLocationNotes()}
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
  form: 'location_notes',
  validate
})(connect(mapStateToProps, { getCampaignData, addLocationNote, editNote })(LocationNotes));