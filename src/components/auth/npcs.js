import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addNPC, getCampaignData } from '../../actions'
import CampaignNav from './campaign_nav';

class Npcs extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    const { type, id } = this.props.params;
    this.props.getCampaignData(id, type);
  }

  addnpcSubmit = ({ name,  image }) => {
    const { id } = this.props.params;
    this.props.addNPC({ name, image, id});
    this.props.reset();
  }

  renderAddNpc() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.addnpcSubmit)}>
        <fieldset className='form-group'>
          <label>* NPC Name:</label>
          <input placeholder='Jor' className='form-control' {...name} />
        </fieldset>
        <fieldset className='form-group'>
          <label>Link to Image:</label>
          <input placeholder='imgur.com/urlforcharacterimage' className='form-control' {...image} />
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

  renderNpcs() {
    const campaign  = this.props.DMCampaign;
    if (!campaign) { return; }
    const npcs = campaign.NPCs
    return npcs.map(function(object){
      return (
        <li className='list-group-item' key={object.name}>
          <h4>{object.name}</h4>
        </li>
      );
    });
   }

  render() {
    return (
      <div>
        <CampaignNav index={1} />
        <div className='container'>
          <h1>Hi</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    Campaign: state.user.Campaign,
    errorMessage: state.user.error
  }
}

export default reduxForm({
  form: "Add_npc",
})(connect(mapStateToProps, { addNPC, getCampaignData})(Npcs));