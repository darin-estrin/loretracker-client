import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import _ from 'lodash';
import CampaignNav from './campaign_nav';
import { getCampaignData, shareLore } from '../../actions';
import * as styles from '../../css/material_styles';

class ShareLore extends Component {

  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
  }

  onListItemTap(playerId, loreItem) {
    const { lore, campaign } = this.props;
    const loreItemToShare = _.find(lore, ['title', loreItem]);
    const campaignName = campaign.campaignName;
    this.props.shareLore({playerId, campaignName, loreItemToShare});
  }

  renderList() {
    const { players, params: { lore }} = this.props;
    if (!players) { return; }
    return players.map(function(player) {
      return (
        <ListItem style={styles.listItemStyle} key={player.email}
          primaryText={player.name} 
          onTouchTap={() => this.onListItemTap(player.playerId, lore)} />
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
    const { type, id, lore } = this.props.params;
    return (
      <div>
        <CampaignNav index={3} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
            <List style={styles.listStyle}>
              <h2 className='notes-header'>Who would you like to share {`"${lore}"`} with?</h2>
              {this.renderList()}
            </List>
            {this.renderSuccessMessage()}
            <Link to={`/campaigns/${type}/${id}/lore`} >
              <RaisedButton style={{marginTop: '10px'}} label='Back To Lore Items' />
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
    lore: state.user.Campaign.lore,
    campaign: state.user.Campaign,
    successMessage: state.user.success
  }
}

export default connect(mapStateToProps, { getCampaignData, shareLore })(ShareLore);