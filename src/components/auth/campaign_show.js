import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { addPlayer, addLore, addLocation, addNPC} from '../../actions';

class Campaign extends Component {
  componentWillMount() {
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

export default reduxForm({
  form: 'UpdateCampaign',
  fields: ['player', 'lore', 'npc', 'locations']
}, null, null)(Campaign);