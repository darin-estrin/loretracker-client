import React from 'react';
import { Link } from 'react-router';
import { Paper } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';

const paperStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  padding: '2%',
  color: grey900,
  display: 'flex',
  margin: '1vh'
}

export default () => (
  <div  className='greeting container'>
    <h1>Do you play Dungeons & Dragons</h1>
    <h2>or any other table top RPG?</h2>
    <br />
    <h3>Playing Dungeons & Dragons is always a great time, but sometimes keeping track of everything can leave you encumbered. With Lore Tracker you can easily look up the information you need. So why Lore Tracker?</h3>
    
    <Paper className='main-paper' style={paperStyle} zDepth={4}>
      <div className='main'>
        <img className='char-model' src={require('../images/minis.jpg')} />
        <img className='dungeon-model' src={require('../images/table_top.jpg')} />
      </div>
    </Paper>
    
    <Paper className='pros' style={paperStyle} zDepth={4}>
      <div className="dm-pro">
        <h4>Dungeon Masters</h4>
        <ul>
          <li><img className='bullet' src={require('../images/dice.png')}/> Store all data in one easy location</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Store data for multiple campaigns</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Easily share information with the party of just specific players</li>
        </ul>
      </div>
      <div className="pc-pro">
        <h4>Players</h4>
        <ul>
          <li><img className='bullet' src={require('../images/dice.png')}/> Store all data in one easy location</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Never worry about taking extended breaks and forgetting vital information</li>
          <li><img className='bullet' src={require('../images/dice.png')}/> Add your own data player notes to information that has been shared with you.</li>
        </ul>
      </div>
    </Paper>
    <h4 className='get-started'>To get started either <Link to='/signin'>Sign in</Link> or <Link to='/signup'>Sign up</Link>!</h4>
  </div>
);