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
        {
          this.props.randomNumber ?
            <div>
              <p>{ homeText }</p>
              <div>{this.props.someRandomNumber}</div>
              <button onClick={this.onClickGenerateRandom}>Generate random number</button>
            </div>
            :
            'nothing!'
        }

      </div>
    );
  }
}