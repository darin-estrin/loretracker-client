import React, { Component } from 'react';
import { Link } from 'react-router';

class EditPlayer extends Component {
  render() {
    return (
      <div>
        <h1>Hi {this.props.params.player}</h1>
      </div>
    );
  }
}

export default EditPlayer;