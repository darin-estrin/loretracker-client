import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import _ from 'lodash';
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

  onListItemTap(playerId, npc) {
    const { npcs, campaign } = this.props;
    const npcToShare = _.find(npcs, ['name', npc]);
    const campaignName = campaign.campaignName;
    this.props.shareNpc({playerId, campaignName, npcToShare })
  }

  renderList() {
    const { players, params: { npc }} = this.props;
    if (!players) { return; }
    return players.map(function(player) {
      return (
        <ListItem style={styles.listItemStyle} key={player.email}
          primaryText={player.name} onTouchTap={() => this.onListItemTap(player.playerId, npc)} />
      )
    }, this);
  }

  renderSuccessMessage() {
    if(this.props.successMessage) {
      return(
        <div className='alert alert-success'>
          <strong>{this.props.successMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { type, id, npc } = this.props.params;
    return (
      <div>
        <CampaignNav index={1} />
        <div className='container'>
          <Paper style={styles.paperStyle} zDepth={4}>
            <List style={styles.listStyle}>
              <h2 className='notes-header'>Who would you like to share {npc} with?</h2>
              {this.renderList()}
            </List>
            {this.renderSuccessMessage()}
            <Link to={`/campaigns/${type}/${id}/npcs`} >
              <RaisedButton style={{marginTop: '10px'}} label='Back To NPCs' />
            </Link>
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
    campaign: state.user.Campaign,
    successMessage: state.user.success
  }
}

export default connect(mapStateToProps, { getCampaignData, shareNpc })(ShareNpc);