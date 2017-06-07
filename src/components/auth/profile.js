import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';
require('../../css/greeting.scss');

const token = localStorage.getItem('token');

class Profile extends Component {
  componentWillMount() {
    this.props.getUserData();
  }

  renderPage() {
    if (!this.props.DMCampaigns || this.props.PCCampaigns){
      return(
        <div>
          <h1 className='greeting'>Welcome {this.props.name}</h1>
          <h3>To get started either <Link to='/startcampaign'>Start a campaign</Link> or ask your Dungeon Master to invite you to theirs.</h3>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
       {this.renderPage()} 
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    DMCampaigns: state.user.DMCampaigns,
    PCCampaigns: state.user.PCCampaigns
  };
}

export default connect(mapStateToProps, actions)(Profile);