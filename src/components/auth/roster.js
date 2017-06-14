import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { addPlayer, getCampaignData } from '../../actions';

class Roster extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  
  componentWillMount() {
    const { type, id } = this.props.params;
    if (type === 'dm') {
      this.props.getCampaignData(id, type);
    } else if (type === 'pc') {
      this.props.getCampaignData(this.props.params.id, type);
    }    
  }

  addPlayerSubmit = ({ email, name }) => {
    const { id } = this.props.params;
    this.props.addPlayer({ email, campaignId: id, name });
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
        <Link className='btn btn-danger pull-right' to='/campaigns'>Back to Campaigns</Link>
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
    const campaign  = this.props.Campaign;
    const { type, id } = this.props.params;
    if (!campaign) { return; }
    const players = campaign.players
    return players.map(function(object){
      return (
        <li className='list-group-item' key={object.email}>
          <Link to={`/campaigns/${type}/${id}/roster/${object.name}`}><h4>{object.name}</h4></Link>
        </li>
      );
    });
  }

  render() {
    const {id, type} = this.props.params;
    return (
      <div>
        <div className='row'>
          {!this.props.Campaign ? '' : <h2>{this.props.Campaign.campaignName}</h2>}
          <div className='col-md-6 col-xs-12'>
            <h2>Players</h2>
            <ul className='list-group'>
              {this.renderPlayers()}
            </ul>
            {this.props.params.type ==='dm' ? this.renderAddPlayer() : <Link className='btn btn-danger pull right' to='/campaigns'>Back To Campaigns</Link>}
          </div>
          <div className='col-md-6 col hidden-xs'>

          </div>
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
  form: 'add_player',
  fields: [ 'name', 'email' ]
}, mapStateToProps, {
  addPlayer,
  getCampaignData
})(Roster);