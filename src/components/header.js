import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import { Navbar, Nav, Image } from 'react-bootstrap';
require('../css/header.scss');

const token = localStorage.getItem('token');

class Header extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    const currentRoute = this.context.router.createLocation(location);
    if (token && currentRoute.pathname === '/') {
      this.context.router.push('/profile');
    }
  }

  onSignoutClick = () => {
    this.props.signoutUser()
  }

  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/profile'>Profile</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/' onClick={this.onSignoutClick}>Sign Out</Link>
        </li>,
        <li className='nav-item' key={3}>
          <Link className='nav-link' to='/editProfile'>Edit Profile</Link>
        </li>
      ]
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
      <Navbar inverse collapseOnSelect>
        <Image className='logo-left' src={require('../images/logo.png')} />
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Lore Tracker</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.renderLinks()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(Header);