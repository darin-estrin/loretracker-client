import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { addPlayer, addLore, addLocation, addNPC, getCampaignData } from '../../actions';

class Campaign extends Component {
  componentWillMount() {
    console.log(this.props);
    const { name, userType } = this.props.params;
    console.log(name, userType);

  }

  render() {
    return (
      <div>
        Welcome
      </div>
    );
  }
}

function mapStateToProps() {
  return {

  }
}

export default reduxForm({
  form: 'UpdateCampaign',
  fields: ['player', 'lore', 'npc', 'locations']
}, mapStateToProps, {
  addLore,
  addLocation,
  addNPC,
  addPlayer,
  getCampaignData
})(Campaign);