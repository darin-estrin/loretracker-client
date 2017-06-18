import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui'
import * as styles from '../../css/material_styles';

class CampaignNav extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  renderRosterComponent = () => {
    const { _id } = this.props.Campaign;
    var type;
    if (this.props.Campaign.owner) { type = 'dm' } 
    else { type = 'pc' }
    this.context.router.push(`/campaigns/${type}/${_id}/roster`);
  }

  renderNpcComponent = () => {
    const { _id } = this.props.Campaign;
    var type;
    if (this.props.Campaign.owner) { type = 'dm'}
    else { type = 'pc' }
    this.context.router.push(`/campaigns/${type}/${_id}/npcs`);
  }

  renderLocationComponent = () => {
    const { _id } = this.props.Campaign;
    var type;
    if (this.props.Campaign.owner) { type = 'dm'}
    else { type = 'pc' }
    this.context.router.push(`/campaigns/${type}/${_id}/locations`);
  }

  renderLoreComponent = () => {
    const { _id } = this.props.Campaign;
    var type;
    if (this.props.Campaign.owner) { type = 'dm'}
    else { type = 'pc' }
    this.context.router.push(`/campaigns/${type}/${_id}/lore`);
  }

  render() {
      return (
      <Tabs
        className='nav-bar'
        initialSelectedIndex={this.props.index}
      >
        <Tab onActive={this.renderRosterComponent} label='Players' style={styles.appBarStyles} ></Tab>
        <Tab onActive={this.renderNpcComponent} label='NPCs' style={styles.appBarStyles}></Tab>
        <Tab onActive={this.renderLocationComponent} label='Locations' style={styles.appBarStyles}></Tab>
        <Tab onActive={this.renderLoreComponent} label='Lore' style={styles.appBarStyles}></Tab>
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
  return {
    Campaign: state.user.Campaign
  }
}

export default connect(mapStateToProps)(CampaignNav);