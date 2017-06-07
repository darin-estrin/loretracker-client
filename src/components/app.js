import React, { Component } from 'react';

import Header from './header';
import Footer from './footer';
require('../css/app.scss');

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
