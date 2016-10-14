import React, {Component} from 'react';
import YouTube from 'react-youtube';

const PLAYBACK_DURATION_SECONDS = 10;
let YT_PLAYER = {};

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.onReady = ::this.onReady;
    this.onPlay = ::this.onPlay;
    this.randomNumberBetween = ::this.randomNumberBetween;
  }

  // Returns a random number between min (inclusive) and max (exclusive)
  randomNumberBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onReady(event) {
    YT_PLAYER = event.target;

    // generate a random number between 30s and (videoLength - PLAYBACK_DURATION_SECONDS)
    // const startSeconds = this.randomNumberBetween(30, videoLengthSeconds - PLAYBACK_DURATION_SECONDS);
    // player.seekTo(startSeconds, true);
    // setTimeout(() => player.stopVideo(), PLAYBACK_DURATION_SECONDS * 1000);

    // YT_PLAYER.loadPlaylist({
    //   list: 'PLB7F28066A1C8F5FE',
    //   listType: 'playlist',
    //   startSeconds: 30,
    //   suggestedQuality: 'small',
    // });

    // const videoLengthSeconds = YT_PLAYER.getDuration();
    // console.log(`duration: ${videoLengthSeconds}`);

    // player.loadVideoById({videoId: '5wBTdfAkqGU',
    //   startSeconds: 30,
    //   endSeconds: 40,
    //   suggestedQuality: 'small'})
  }

  onPlay(event) {
    const videoLengthSeconds = YT_PLAYER.getDuration();
    const startSeconds = this.randomNumberBetween(30, videoLengthSeconds - PLAYBACK_DURATION_SECONDS);

    console.log(`onPlay, videoLength: ${videoLengthSeconds}s, start: ${startSeconds}s`);

    //TODO: BUG! seekTo triggers onPlay event so this is an infinite loop!
    YT_PLAYER.seekTo(startSeconds, true);
    setTimeout(() => YT_PLAYER.stopVideo(), PLAYBACK_DURATION_SECONDS * 1000);
  }
  
  componentDidMount() {
    // schedule the motherfucker
    setTimeout(() => {
      console.log(`waking up...`);

      // TODO: some logic to determine whether we should play mp3 or not
      const playList = YT_PLAYER.getPlaylist();

      if(playList && playList.length > 0) {
        // play next
        console.log(`playlist exist, playing next`);
        YT_PLAYER.nextVideo();
        return;
      }

      console.log(`playlist doesn't exist, initialising`);
      YT_PLAYER.loadPlaylist({
        list: 'PLB7F28066A1C8F5FE',
        listType: 'playlist',
        startSeconds: 30,
        suggestedQuality: 'small',
      });
    }, 7000);
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        loop: 1,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
      }
    };

    return (
      <YouTube
        opts={opts}
        onReady={this.onReady}
        onPlay={this.onPlay}
      />
    );
  }
}