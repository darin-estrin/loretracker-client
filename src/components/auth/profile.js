import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
require('../../css/greeting.scss');

const token = localStorage.getItem('token');

class Profile extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.getUserData();
  }

  renderPage() {
    if (!this.props.campaigns){
      return(
        <div>
          <h1 className='greeting'>Welcome {this.props.name}</h1>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
       {this.renderPage()} 
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    message: state.auth.message,
    name: state.user.name
  };
}

export default connect(mapStateToProps, actions)(Profile);