import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { addPlayer, addLore, addLocation, addNPC, getCampaignData, getUserData } from '../../actions';

class Campaign extends Component {
  componentWillMount() {
    console.log(this.props);
  }

  handleFormSubmit = ({ email }) => {
    const { name } = this.props.params;
    console.log(name);
    this.props.addPlayer({ email, campaignName: name });
  }

  renderFields(type) {
    const { handleSubmit, fields : { name, email, phone, image, bio, description }} = this.props;
    if (type === 'pc') {
      return (
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className='form-group'>
            <label>* Add Player Email:</label>
            <input placeholder='Uktar@email.com'className='form-control' {...email} />
          </fieldset>
          <button action='submit' className='btn btn-primary'>Add Player</button>
        </form>
      )
    }
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            <h2>Players</h2>
            <ul className='list-group'>
            
            </ul>
            {this.renderFields('pc')}
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            <h2>NPC's</h2>
            <ul className='list-group'>
            
            </ul>
            {this.renderFields('npc')}
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            <h2>Locations</h2>
            <ul className='list-group'>
            
            </ul>
            {this.renderFields('location')}
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            <h2>Lore</h2>
            <ul className='list-group'>
            
            </ul>
            {this.renderFields('lore')}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    DMCampaigns: state.user.DMCampaigns
  }
}

export default reduxForm({
  form: 'UpdateCampaign',
  fields: [ 'name', 'email', 'phone', 'image', 'bio', 'description' ]
}, mapStateToProps, {
  addLore,
  addLocation,
  addNPC,
  addPlayer,
  getCampaignData
})(Campaign);