import React, { Component } from 'react';
require('../css/header.scss');

class Header extends Component {
  render() {
    return(
      <div>
        <div id='header'>
          <div>
             <img className='logo' src={require('../images/logo.png')} alt='logo' />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;