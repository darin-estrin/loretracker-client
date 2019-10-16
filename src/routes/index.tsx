import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';

interface Props{}

interface State {}

class Router extends React.Component<Props,State> {

  public render():JSX.Element {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    );
  }
}

export default Router;
