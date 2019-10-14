import React from 'react';
import Navbar from './components/Navbar';
import Router from './routes/index';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar brand='Lore Tracker' />
      <Router />
    </div>
  );
}

export default App;
