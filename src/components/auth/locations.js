import React, { Component } from 'react';
import CampaignNav from './campaign_nav';

class Locations extends Component {
  render() {
    return (
      <div>
        <CampaignNav index={2} />
        <div className='container'>
          This is the Location Section
        </div>
      </div>
    )
  }
}

export default Locations;