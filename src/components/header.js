import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signoutUser } from '../actions';
import { grey900, redA400 } from 'material-ui/styles/colors';
import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const token = localStorage.getItem('token');

const appBarStyles = {
  backgroundColor: grey900,
  color: redA400
}

const menuItemStyle = {
  color: redA400
}

class Header extends Component {

  onSignoutClick = () => {
    this.props.signoutUser()
  }

  renderIcon() {
    if (this.props.authenticated) {
      return(
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          iconStyle={{fill: redA400}}
        >
          <Link to='/profile'><MenuItem primaryText='Profile' style={menuItemStyle} /></Link>
          <Link to='/campaigns'><MenuItem primaryText='View Campaigns' style={menuItemStyle} /></Link>
          <Link onClick={this.onSignoutClick}><MenuItem primaryText='Sign Out' style={menuItemStyle} /></Link>
        </IconMenu>
      )
    } else {
      return(
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        >
          <Link to='/signin'><MenuItem primaryText='Sign In' style={menuItemStyle} /></Link>
          <Link to='/signin'><MenuItem primaryText='Sign Out' style={menuItemStyle} /></Link>
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
        showMenuIconButton={false}
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