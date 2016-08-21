import React, {Component} from 'react';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.eventSource = {};
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

  componentDidMount() {
    this.eventSource = new EventSource("/events");
    this.eventSource.onmessage = (event) => {
      console.log(`noevent: ${event.data}`);
    };

    this.eventSource.addEventListener('ping', e => console.log(`pingHandler ${e.data}`));
  }

  componentWillUnmount() {
    this.eventSource.close();
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