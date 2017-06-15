import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signoutUser } from '../actions';
import { grey900, redA400 } from 'material-ui/styles/colors';
import { AppBar, IconButton, IconMenu, MenuItem, FontIcon } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const token = localStorage.getItem('token');

const appBarStyles = {
  backgroundColor: grey900,
  color: redA400
}

const menuItemStyle = {
  color: redA400
}

const menuIcon = {
  color: redA400,
  marginTop: '12px'
}

class Header extends Component {

  onSignoutClick = () => {
    this.props.signoutUser()
  }

  homeIcon() {
    return (
      <Link to='/'>
        <FontIcon style={menuIcon} className='material-icons'>home</FontIcon>
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
          <Link to='/signin'><MenuItem primaryText='Sign Out'/></Link>
        </IconMenu>
      );
    }
  }

  render() {
    return(
      <AppBar
        title='Lore Tracker'
        zDepth={4}
        style={appBarStyles}
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