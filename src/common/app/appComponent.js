import React, {Component} from 'react';
import {Link} from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Salesbot</h1>
        <div>{this.props.children}</div>
      </div>
    );
  }
}