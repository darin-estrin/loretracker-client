import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signoutUser } from '../actions';
import { redA400 } from 'material-ui/styles/colors';
import { AppBar, IconButton, IconMenu, MenuItem, FontIcon } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as styles from '../css/material_styles';
const token = localStorage.getItem('token');

class Header extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  onSignoutClick = () => {
    this.props.signoutUser()
  }

  homeIcon() {
    return (
      <Link to='/'>
        <FontIcon style={styles.menuIcon} className='material-icons'>home</FontIcon>
      </Link>
    );
  }

  renderIcon() {
    if (this.props.authenticated) {
      return(
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          iconStyle={{fill: redA400}}
        >
          <Link to='/profile'><MenuItem primaryText='Profile' /></Link>
          <Link to='/campaigns'><MenuItem primaryText='View Campaigns' /></Link>
          <Link onClick={this.onSignoutClick}><MenuItem primaryText='Sign Out' /></Link>
        </IconMenu>
      )
    } else {
      return(
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          iconStyle={{fill: redA400}}
        >
          <Link to='/signin'><MenuItem primaryText='Sign In'/></Link>
          <Link to='/signup'><MenuItem primaryText='Sign Up'/></Link>
        </IconMenu>
      );
    }
  }

  render() {
    return(
      <AppBar
        title='Lore Tracker'
        style={styles.appBarStyles}
        titleStyle={{color: redA400}}
        iconElementRight={this.renderIcon()}
        iconElementLeft={this.homeIcon()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, { signoutUser })(Header);