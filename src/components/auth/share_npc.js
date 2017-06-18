import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { RaisedButton, Paper, Checkbox } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form';
import CampaignNav from './campaign_nav';
import { getCampaignData, shareNpc } from '../../actions';
import * as styles from '../../css/material_styles';

class ShareNpc extends Component {
  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
  }

  handleFormSubmit = (values) => {
    const { id, npc } = this.props.params;
    let emails = [];
    if (values.all) {
      this.props.players.map(function(player) {
        email.push(player.email);
      })
      this.props.shareNpc({emails, id, npc})
    } else {
      console.log(values);
      this.props.shareNpc({values, id, npc});
    }
  }

  renderPlayersToShareWith() {
    const { players } = this.props;
    const self = this;
    if (!players) { return; }
    return players.map(function(player) {
      return (
        <div key={player.email}>
          <Field label={player.name} component={self.renderCheckBox} name={player.email} />
        </div>
      );
    });
  }

  renderCheckBox({ input, label}) {
    return (
      <Checkbox label={label} checked={input.value ? true : false}
        onCheck={input.onChange}
      />
    );
  }

  render() {
    const { handleSubmit, params: { type, id, npc }} = this.props;
    return (
      <div>
        <CampaignNav index={1} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
            <h2>Who would you like to share {npc} with?</h2>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                {this.renderPlayersToShareWith()}
              <div>
                <Field name='all' component={this.renderCheckBox} label='All Players' />
              </div>
              <RaisedButton type='submit' label='Share' />
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.user.Campaign) { return {...state} }
  return {
    players: state.user.Campaign.players,
    npcs: state.user.Campaign.NPCs
  }
}

export default reduxForm({
  form: 'share_npc'
})(connect(mapStateToProps, { getCampaignData, shareNpc })(ShareNpc));