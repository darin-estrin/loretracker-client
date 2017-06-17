import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, RaisedButton, Paper, List, ListItem } from 'material-ui';
import { grey900, grey800 } from 'material-ui/styles/colors';
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
  flex: 1
}

const listItemStyle = {
  fontSize: '2vmax'
}

const listStyle = {
  backgroundColor: grey800
}

class PlayerNotes extends Component {
  render() {
    return(
      <div>
        <CampaignNav />
        <div className='container'>
          <Paper style={paperStyle}>
        
          </Paper>
        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default reduxForm({
  form: 'player_notes'
})(connect(mapStateToProps, null)(PlayerNotes));