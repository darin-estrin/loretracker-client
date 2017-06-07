import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
require('../css/header.scss');

class Header extends Component {

  // componentWillMount() {
  //   if (token) {
  //     this.props.getUserData();
  //   }
  // }

  onSignoutClick = () => {
    this.props.signoutUser()
  }

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className='nav-item'>
          <Link className='nav-link' to='/' onClick={this.onSignoutClick}>Sign Out</Link>
        </li>
      )
    } else {
      return [
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/signin'>Sign In</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/signup'>Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return(
      <nav className="navbar navbar-inverse">
      <img className='img-responsive logo-left' src={require('../images/logo.png')} />
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand brand" to="/">Lore Tracker</Link>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className='nav-item'><Link to="/profile">Home</Link></li>
            {this.renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(Header);