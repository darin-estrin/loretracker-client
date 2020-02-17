import React from 'react';

import Helmet from '../components/Helmet';
import { registerUser } from '../api/auth';

class HomePage extends React.Component {

  state = {
    textArea: ''
  }

  private handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(this.state)
  }
  
  public render():JSX.Element {
    return (
      <div className='home-page'>
        <Helmet title='Lore Tracker' />
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Primary title
              </h1>
              <h2 className="subtitle">
                Primary subtitle
              </h2>
              <form onSubmit={this.handleSubmit}>

                <textarea onChange={(e) => this.setState({ textArea: e.target.value })}></textarea>
                
                <button type='submit'>Submit</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
