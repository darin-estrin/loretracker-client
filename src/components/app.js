import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './header';
import Footer from './footer';
require('../css/app.scss');
injectTapEventPlugin();

lightBaseTheme.fontFamily = 'Medival Sharp, Roboto';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Header />
          <div className='container'>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
