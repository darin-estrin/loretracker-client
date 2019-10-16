import React from 'react';

class HomePage extends React.Component {
  
  public render():JSX.Element {
    return (
      <div className='home-page'>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Primary title
              </h1>
              <h2 className="subtitle">
                Primary subtitle
              </h2>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
