import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, Paper, List, ListItem }  from 'material-ui';
import { grey900, grey800 } from 'material-ui/styles/colors';
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

const paperStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  color: grey900,
  padding: '2%',
  minHeight: '50vh',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5vh',
  flex: 1,
  marginRight: '10px'
}

const listItemStyle = {
  fontSize: '2vmax'
}

const listStyle = {
  backgroundColor: grey800
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
        <Link to='/campaigns'><RaisedButton label='Back to Campaigns' secondary={true}/></Link>
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
        <Link key={object._id} to={`/campaigns/${type}/${id}/roster/${object.name}`}>
          <ListItem style={listItemStyle} primaryText={object.name} />
        </Link>
      );
    });
  }

  render() {
    const {id, type} = this.props.params;
    return (
      <div>
        <CampaignNav index={0} />
        <div className='container'>
          <Paper style={{display: 'flex', backgroundColor:'none', width: '100%'}}>
            <Paper style={paperStyle}>
              {!this.props.Campaign ? '' : <h2>{this.props.Campaign.campaignName}</h2>}
                <h2>Players</h2>
                <List style={listStyle}>
                  {this.renderPlayers()}
                </List>
                {this.props.params.type ==='dm' ? this.renderAddPlayer() : 
                <Link to='/campaigns'>
                  <RaisedButton label='Back to Campaigns' secondary={true}/>
                </Link>}
            </Paper>
            <Paper style={paperStyle}>
            
            </Paper>
          </Paper>
          
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