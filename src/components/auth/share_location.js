import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import _ from 'lodash';
import CampaignNav from './campaign_nav';
import { getCampaignData, shareLocation} from '../../actions';
import * as styles from '../../css/material_styles';

class ShareLocation extends Component {

  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
  }

  onListItemTap(playerId, location) {
    const { locations, campaign } = this.props;
    const locationToShare = _.find(locations, ['name', location]);
    const campaignName = campaign.campaignName;
    this.props.shareLocation({playerId, campaignName, locationToShare});
  }

  renderList() {
    const { players, params: { location }} = this.props;
    if (!players) { return; }
    return players.map(function(player) {
      return (
        <ListItem style={styles.listItemStyle} key={player.email}
          primaryText={player.name} 
          onTouchTap={() => this.onListItemTap(player.playerId, location)} />
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
    const { type, id, location } = this.props.params;
    return (
      <div>
        <CampaignNav index={2} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
            <List style={styles.listStyle}>
              <h2 className='notes-header'>Who would you like to share {location} with?</h2>
              {this.renderList()}
            </List>
            {this.renderSuccessMessage()}
            <Link to={`/campaigns/${type}/${id}/locations`} >
              <RaisedButton style={{marginTop: '10px'}} label='Back To Locations' />
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
    locations: state.user.Campaign.locations,
    campaign: state.user.Campaign,
    successMessage: state.user.success
  }
}

export default connect(mapStateToProps, { getCampaignData, shareLocation })(ShareLocation);