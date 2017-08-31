import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signoutUser } from '../actions';
import { redA400 } from 'material-ui/styles/colors';
import { AppBar, IconButton, IconMenu, MenuItem, FontIcon, RaisedButton } from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import * as styles from '../css/material_styles';
const token = localStorage.getItem('token');

class Header extends Component {
  state = {
    width: window.innerWidth
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  onSignoutClick = () => {
    this.props.signoutUser()
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.width !== this.state.width) {
      return true;
    }

    if(nextProps.authenticated !== this.props.authenticated) {
      return true;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.render();
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
          iconButtonElement={<IconButton><MenuIcon /></IconButton>}
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
          iconButtonElement={<IconButton><MenuIcon/></IconButton>}
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

  renderButtons() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to='/profile'><RaisedButton 
            style={styles.appButtonStyle} 
            labelStyle={styles.appButtonStyle.label} 
            label='Profile' /></Link>
          <Link to='/campaigns'><RaisedButton 
            style={styles.appButtonStyle} 
            labelStyle={styles.appButtonStyle.label} 
            label='View Campaigns' /></Link>
          <Link onClick={this.onSignoutClick}><RaisedButton 
            style={styles.appButtonStyle} 
            labelStyle={styles.appButtonStyle.label} 
            label='Sign Out' /></Link>
        </div>
      )
    } else {
      return (
        <div>
        <Link to='/signin'><RaisedButton 
          style={styles.appButtonStyle} 
          labelStyle={styles.appButtonStyle.label} 
          label='Sign In'/></Link>
        <Link to='/signup'><RaisedButton 
          style={styles.appButtonStyle} 
          labelStyle={styles.appButtonStyle.label} 
          label='Sign Up'/></Link>
        </div>
      )
    }
  }

  render() {
    return (
      <AppBar
        title='Lore Tracker'
        style={styles.appBarStyles}
        titleStyle={{color: redA400}}
        iconElementLeft={this.homeIcon()}
        iconStyleLeft={{marginLeft: '20px'}}
        iconElementRight={window.innerWidth < 700 ? this.renderIcon() : this.renderButtons()}
        iconStyleRight={{marginRight: '20px'}}
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