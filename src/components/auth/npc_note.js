import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import CampaignNav from './campaign_nav';
import { getCampaignData, addNpcNote } from '../../actions';
import * as styles from '../../css/material_styles';

class NpcNotes extends Component {
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
        inputStyle={{color:grey900}}
        {...input}
        {...custom}
      />
    );
  }

  renderNpcNotes() {
    var npc;
    const { campaign } = this.props;
    if (!campaign) { return; } 
    else { npc =_.find(campaign.NPCs, ['name', this.props.params.npc]); }
    const notes = npc.notes;
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
    const player = _.find(this.props.campaign.NPCs, ['name', this.props.params.npc]);
    this.props.addNpcNote({note, id: player._id, type, campaignId: id});
    this.props.reset();
  }

  render() {
    const { handleSubmit, params: { type, id, npc }} = this.props;
    return(
      <div>
        <CampaignNav index={1} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
            <List style={styles.listStyle}>
              <h3 className='notes-header'>Notes for {npc}</h3>
              {this.renderNpcNotes()}
            </List>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div>
                <Field label='Add a note' name='note' component={this.renderField} />
              </div>
              <RaisedButton type='submit' label='Add Note' />
              <Link to={`/campaigns/${type}/${id}/npcs/${npc}`}>
                <RaisedButton secondary={true} style={styles.buttonStyle} 
                label={`Back to ${npc}`} />
              </Link>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.user.Campaign
  }
}

export default reduxForm({
  form: 'npc_notes'
})(connect(mapStateToProps, { getCampaignData, addNpcNote })(NpcNotes));