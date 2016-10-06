import React, {Component} from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onClickGenerateRandom = ::this.onClickGenerateRandom;
    this.onClickSaySomething = ::this.onClickSaySomething;
  }

  onClickGenerateRandom() {
    this.props.generateRandom();
  }

  onClickSaySomething() {
    this.props.saySomething('hello world');
  }

  render() {
    let homeText = 'Click button below to generate a random number!';

    return (
      <div>
        {
          this.props.randomNumber ?
            <div>
              <p>{ homeText }</p>
              <div>{this.props.someRandomNumber}</div>
              <button onClick={this.onClickGenerateRandom}>Generate random number</button>
              <button onClick={this.onClickSaySomething}>Say something!</button>
              <div>{this.props.something}</div>
            </div>
            :
            'nothing!'
        }

      </div>
    );
  }
}