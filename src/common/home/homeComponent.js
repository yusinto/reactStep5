import React, {Component} from 'react';
import YouTube from 'react-youtube';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.onReady = ::this.onReady;
    this.randomNumberBetween = ::this.randomNumberBetween;
  }

  // Returns a random number between min (inclusive) and max (exclusive)
  randomNumberBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onReady(event) {
    console.log(`youtube player ready`);
    window.YT_PLAYER = event.target;
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
      }
    };

    return (
      <YouTube
        opts={opts}
        onReady={this.onReady}
      />
    );
  }
}