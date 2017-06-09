import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Campaign extends Component {
  componentWillMount() {
    const campaign = this.props.params.id;
    console.log(campaign)
  }

  render() {
    return (
      <div>
        Welcome
      </div>
    );
  }
}

export default Campaign;