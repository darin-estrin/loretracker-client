import React, { Component } from 'react';
import CampaignNav from './campaign_nav';

class Lore extends Component {
  render() {
    return (
      <div>
        <CampaignNav index={3} />
        <div className='container'>
          This is the Lore Section
        </div>
      </div>
    )
  }
}

export default Lore;