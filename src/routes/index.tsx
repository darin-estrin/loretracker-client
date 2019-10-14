import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';

interface Props{}

interface State {}

class Router extends React.Component<Props,State> {

  public render():JSX.Element {
    return (
      <div className='container'>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default Router;
