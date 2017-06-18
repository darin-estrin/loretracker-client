import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form';
import CampaignNav from './campaign_nav';
import { getCampaignData } from '../../actions';
import * as styles from '../../css/material_styles';

class ShareNpc extends Component {
  componentWillMount() {
    const { id, type } = this.props.params;
    if (!this.props.campaign) {
      this.props.getCampaignData(id, type);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <CampaignNav index={1} />
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
})(connect(mapStateToProps, { getCampaignData })(ShareNpc));