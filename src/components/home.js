import React from 'react';
import { Link } from 'react-router';
require('../css/home.scss');

export default () => (
  <div>
    <h1>Do you play Dungeons & Dragons</h1>
    <h2>or any other table top RPG?</h2>
    <br />
    <h3>Playing Dungeons & Dragons is always a great time, but sometimes keeping track of everything can leave encumbered. With Lore Tracker you can easily look up the information you need. So why Lore Tracker?</h3>
    <div className="jumbotron visible-lg">
      <img className='img-responsive col-lg-6' src={require('../images/minis.jpg')} />
      <img className='img-responsive col-lg-6' src={require('../images/table_top.jpg')} />
    </div>
    <div className="jumbotron visible-md">
      <img className='img-responsive col-lg-12' src={require('../images/minis.jpg')} />
      <br />
      <img className='img-responsive col-lg-12' src={require('../images/table_top.jpg')} />
    </div>
    <div className="row">
      <div className="col-md-6 col-xs-12 well dm-pro">
        <h4>Dungeon Masters</h4>
        <ul>
          <li><img className='bullet' src={require('../images/dice.png')}/> Store all data in one easy location</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Access it through you phone (mobile app coming soon)</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Store data for multiple campaigns</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Easily share information with the party of just specific players</li>
        </ul>
      </div>
      <div className="col-md-6 col-xs-12 well pc-pro">
        <h4>Players</h4>
        <ul>
          <li><img className='bullet' src={require('../images/dice.png')}/> Store all data in one easy location</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Access it through you phone (mobile app coming soon)</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Never worry about taking extended breaks and forgetting vital information</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Add your own data or modify existing data</li>
        </ul>
      </div>
    </div>
    <h4>To get started either <Link to='/signin'>Sign in</Link> or <Link to='/signup'>Sign up</Link>!</h4>
  </div>
);