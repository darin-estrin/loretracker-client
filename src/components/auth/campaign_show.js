import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { addPlayer, addLore, addLocation, addNPC, getCampaignData } from '../../actions';

class Campaign extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  
  componentWillMount() {
    this.props.getCampaignData(this.props.params.id);
  }

  addPlayerSubmit = ({ email }) => {
    const { id } = this.props.params;
    this.props.addPlayer({ email, campaignId: id });
    this.props.resetForm();
  }

  renderFields(type) {
    const { handleSubmit, fields : { name, email, phone, image, bio, description }} = this.props;
    if (type === 'pc') {
      return (
        <form onSubmit={handleSubmit(this.addPlayerSubmit)}>
          <fieldset className='form-group'>
            <label>* Add Player Email:</label>
            <input placeholder='Uktar@email.com'className='form-control' {...email} />
          </fieldset>
          {this.renderAlert()}
          <button action='submit' className='btn btn-primary'>Add Player</button>
        </form>
      )
    }
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      )
    }
  }

  renderPlayers() {
    const campaign  = this.props.DMCampaign;
    if (!campaign) { return; }
    const players = campaign.players
    return players.map(function(object){
      return (
        <li className='list-group-item' key={object.email}>
          <h4>{object.name}</h4>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            <h2>Players</h2>
            <ul className='list-group'>
              {this.renderPlayers()}
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
    DMCampaign: state.user.DMCampaign,
    PCCampaign: state.user.PCCampaign,
    errorMessage: state.user.error
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