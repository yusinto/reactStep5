import React, {Component} from 'react';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.onClickGenerateRandom = ::this.onClickGenerateRandom;
  }

  onClickGenerateRandom() {
    this.props.generateRandom();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLDReady && !this.props.isLDReady) {
      this.props.initialiseHomeFlags();
    }
  }

  render() {
    return (
      <div>
        {
          this.props['random-number'] ?
            <div>
              <div>Click button below to generate a random number!</div>
              <div>{this.props.randomNumber}</div>
              <button onClick={this.onClickGenerateRandom}>Generate random number</button>
            </div>
            :
            null
        }
      </div>
    );
  }
}