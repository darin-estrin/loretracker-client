import React from 'react';
import { Link } from 'react-router';
import { Tabs, Tab } from 'material-ui'

export default () => {
  return (
    <Tabs className='nav-bar'>
      <Tab label='Players'></Tab>
      <Tab label='NPCs'></Tab>
      <Tab label='Locations'></Tab>
      <Tab label='Lore'></Tab>
    </Tabs>
  );
}