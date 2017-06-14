import React, { Component } from 'react';
import { Link } from 'react-router';
require('../css/pageNotFound.scss');

const token = localStorage.getItem('token');

class PageNotFound extends Component{

  renderPage(){
    if (token) {
      return (
        <div className='page-not-found'>
          <h1>Sorry Hero, the location you are looking for does not exist in this realm. <Link to='/campaigns'>Click Here</Link> to go back to your home town.</h1>
        </div>
      )
    }

    return (
      <div className='page-not-found'>
        <h1>Sorry Hero, the location you are looking for does not exist in this realm. <Link to='/'>Click Here</Link> to go back to your home town.</h1>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    )
  }
}

export default PageNotFound;