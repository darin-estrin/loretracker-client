import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui'
import * as styles from '../../css/material_styles';

class CampaignNav extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    slideIndex: this.props.index
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

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    });
  }

  render() {
      return (
      <Tabs
        className='nav-bar'
        initialSelectedIndex={this.props.index}
        onChange={this.handleChange}
        inkBarStyle={styles.inkBarStyle}
        value={this.state.slideIndex}
        tabItemContainerStyle={styles.appBarStyles}
      >
        <Tab onActive={this.renderRosterComponent} label='Players' 
          value={0} style={styles.tabStyle}></Tab>
        <Tab onActive={this.renderNpcComponent} label='NPCs' 
          value={1} style={styles.tabStyle}></Tab>
        <Tab onActive={this.renderLocationComponent} label='Locations'
          value={2} style={styles.tabStyle}></Tab>
        <Tab onActive={this.renderLoreComponent} label='Lore'
          value={3} style={styles.tabStyle}></Tab>
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