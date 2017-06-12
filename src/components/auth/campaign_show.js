import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { addPlayer, addNPC, getCampaignData } from '../../actions';

class Campaign extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  
  componentWillMount() {
    this.props.getCampaignData(this.props.params.id);
  }

  addPlayerSubmit = ({ email, name }) => {
    const { id } = this.props.params;
    this.props.addPlayer({ email, campaignId: id, name });
    this.props.resetForm();
  }

  addnpcSubmit = ({ npcName,  npcImage }) => {
    const { id } = this.props.params;
    this.props.addNPC({ npcName, npcImage, id});
    this.props.resetForm();
  }

  renderAddPlayer() {
    const { handleSubmit, fields : { name, email }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.addPlayerSubmit)}>
        <fieldset className='form-group'>
          <label>* Player Email:</label>
          <input placeholder='Uktar@email.com' className='form-control' {...email} />
        </fieldset>
        <fieldset className='form-group'>
          <label>Character Name:</label>
          <input placeholder='Uktar' className='form-control' {...name} />
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Add Player</button>
      </form>
    );
  }

  renderAddNpc() {
    const { handleSubmit, fields: { npcName ,npcImage }} = this.props;
    return (
        <form onSubmit={handleSubmit(this.addnpcSubmit)}>
          <fieldset className='form-group'>
            <label>* NPC Name:</label>
            <input placeholder='Jor' className='form-control' {...npcName} />
          </fieldset>
          <fieldset className='form-group'>
            <label>Link to Image:</label>
            <input placeholder='imgur.com/urlforcharacterimage' className='form-control' {...npcImage} />
          </fieldset>
          {this.renderAlert()}
          <button action='submit' className='btn btn-primary'>Add Player</button>
        </form>
      );
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

  renderNpcs() {
    const campaign  = this.props.DMCampaign;
    if (!campaign) { return; }
    const npcs = campaign.NPCs
    return npcs.map(function(object){
      return (
        <li className='list-group-item' key={object.npcName}>
          <h4>{object.npcName}</h4>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <h2>Players</h2>
            {this.renderAddPlayer()}
            <ul className='list-group'>
              {this.renderPlayers()}
            </ul>
          </div>
          <div className='col-md-6 col-xs-12'>
            <h2>NPC's</h2>
            {this.renderAddNpc()}
            <ul className='list-group'>
              {this.renderNpcs()}
            </ul>
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
  fields: [ 'name', 'email', 'npcName', 'npcImage' ]
}, mapStateToProps, {
  addNPC,
  addPlayer,
  getCampaignData
})(Campaign);