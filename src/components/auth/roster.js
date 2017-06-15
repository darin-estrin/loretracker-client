import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton }  from 'material-ui';
import { grey900, grey50 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { addPlayer, getCampaignData } from '../../actions';
import CampaignNav from './campaign_nav';

const styles = {
  underlineStyle: {
    borderColor: grey900
  },
  floatingLabelStyle: {
    color: grey900
  }
}

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

  renderField({
    input,
    label,
    meta: {touched, error },
    ...custom
  }) {
    return(
      <TextField
          hintText={label}
          hintStyle={{color:grey900}}
          floatingLabelText={label}
          floatingLabelFocusStyle={{color:'#0097A7'}}
          underlineStyle={styles.underlineStyle}
          floatingLabelStyle={styles.floatingLabelStyle}
          errorText={touched && error}
          fullWidth
          inputStyle={{color:grey900}}
          {...input}
          {...custom}
        />
    );
  }

  renderAddPlayer() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.addPlayerSubmit)}>
        <div>
          <Field label='Player Email' name='email' component={this.renderField} />
        </div>
        <div>
          <Field label='Character Name' name='name' component={this.renderField} />
        </div>
        {this.renderAlert()}
        <RaisedButton label='Add Player' type='submit' />
        <Link to='/campaigns'><RaisedButton label='Back to Campaigns' secondary={true} /></Link>
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
        <CampaignNav />
        <div className='container'>
          <div className='row'>
            {!this.props.Campaign ? '' : <h2>{this.props.Campaign.campaignName}</h2>}
            <div className='col-md-6 col-xs-12'>
              <h2>Players</h2>
              <ul className='list-group'>
                {this.renderPlayers()}
              </ul>
              {this.props.params.type ==='dm' ? this.renderAddPlayer() : <Link to='/campaigns'><RaisedButton label='Back to Campaigns' secondary={true} /></Link>}
            </div>
            <div className='col-md-6 col hidden-xs'>

            </div>
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
  form: 'add_player'
})(connect(mapStateToProps, {
  addPlayer,
  getCampaignData
})(Roster)
);