import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900, grey800 } from 'material-ui/styles/colors';
import CampaignNav from './campaign_nav';
import { getCampaignData } from '../../actions';

const paperStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  color: grey900,
  padding: '2%',
  minHeight: '50vh',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5vh',
  flex: 1
}

const listItemStyle = {
  fontSize: '2vmax'
}

const listStyle = {
  backgroundColor: grey800
}

class EditPlayer extends Component {
  componentWillMount() {
    const { type, id } = this.props.params;
    if (type === 'dm') {
      this.props.getCampaignData(id, type);
    } else if (type === 'pc') {
      this.props.getCampaignData(this.props.params.id, type);
    }   
  }

  renderPlayerData() {
    var player;
    if (!this.props.campaign) {
     return;
    } else {
       player =_.find(this.props.campaign.players, ['characterName', this.props.params.player]);
    }
    return (
      <List style={listStyle}>
        <ListItem style={listItemStyle} primaryText={`Name: ${player.name}`} />
        <ListItem style={listItemStyle} primaryText={`Email: ${player.email}`} />
        {player.phone ? <ListItem style={listItemStyle} primaryText={`Phone: ${player.phone}`} /> : ''}
      </List>
    );
  }

  getPlayerImage() {

  }

  render() {
    console.log(this.props);
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <Paper style={paperStyle}>
            <h1>{this.props.params.player}</h1>
            {this.getPlayerImage()}
            {this.renderPlayerData()}
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
  form: 'edit_player'
})(connect(mapStateToProps, { getCampaignData })(EditPlayer));