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
    if(newProps.isLDReady && !this.props.isLDReady) {
      this.props.initialiseHomeFlags();
    }
  }

  render() {
    let homeText = 'Click button below to generate a random number!';

    if(this.props['wellness-red-font']) {
      homeText = <div style={{color: 'red'}}>{homeText}</div>;
    }

    return (
      <div>
        { homeText }
        <div>{this.props.randomNumber}</div>
        <button onClick={this.onClickGenerateRandom}>Generate random number</button>
      </div>
    );
  }
}