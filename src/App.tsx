import React from 'react';
import Navbar from './components/Navbar';
import Router from './routes/index';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Navbar brand='Lore Tracker' />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
