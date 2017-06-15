import React, { Component } from 'react';
import { Link } from 'react-router';
import CampaignNav from './campaign_nav';

class EditPlayer extends Component {
  render() {
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <h1>Hi {this.props.params.player}</h1>
        </div>
      </div>
      
    );
  }
}

export default EditPlayer;