import React, {Component} from 'react';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.onClickGenerateRandom = ::this.onClickGenerateRandom;
  }

  onClickGenerateRandom() {
    this.props.generateRandom();
  }

  render() {

    let homeText = 'Click button below to generate a random number!';

    return (
      <div>
        <p>{ homeText }</p>
        <div>{this.props.randomNumber}</div>
        <button onClick={this.onClickGenerateRandom}>Generate random number</button>
      </div>
    );
  }
}