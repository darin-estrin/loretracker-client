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
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
  }

  handleFormSubmit = (values) => {
    const { players, campaign, npcs, params: { id, npc, type}} = this.props;
    const npcToShare = _.find(npcs, ['name', npc]);
    let ids = [];
    if (values.all) {
      players.map(function(player) {
        ids.push(player.playerId);
      })
      this.props.shareNpc({ids, campaign, npcToShare});
    } else {
      _.forEach(values, function(val, key) {
        ids.push(key);
      });
      this.props.shareNpc({ids, campaign, npcToShare});
    }
    this.props.reset();
    this.context.router.push(`/campaigns/${type}/${id}/npcs`)
  }

  renderPlayersToShareWith() {
    const { players } = this.props;
    const self = this;
    if (!players) { return; }
    return players.map(function(player) {
      return (
        <div key={player.email}>
          <Field label={player.name} component={self.renderCheckBox} name={player.playerId} />
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
            <Paper>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                {this.renderPlayersToShareWith()}
                <div>
                  <Field name='all' component={this.renderCheckBox} label='All Players' />
                </div>
                <RaisedButton primary={true} type='submit' label='Share' />
              </form>
            </Paper>
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
    npcs: state.user.Campaign.NPCs,
    campaign: state.user.Campaign
  }
}

export default reduxForm({
  form: 'share_npc'
})(connect(mapStateToProps, { getCampaignData, shareNpc })(ShareNpc));