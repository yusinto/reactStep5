// Import the render method from react-dom so we can mount our
// component onto an html element
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from '../common/route';
import {Provider} from 'react-redux';
import createStore from '../common/redux/store';
import moment from 'moment';
import blueBird from 'bluebird';

window.Promise = blueBird;

import 'isomorphic-fetch';

const POLLING_INTERVAL_SECONDS = 6;
const PLAYBACK_DURATION_SECONDS = 3;
const PLAYLIST_ID = 'PLB7F28066A1C8F5FE';
const map = new Map();
const apiSecret = 'd2f1e8416a325d96ba56564b8f0f146d';
const event = 'Join: attempted';

let reportDate = moment();
let reportDateString = moment().format('YYYY-MM-DD');
console.log(`Started SalesBot at ${reportDate.format('YYYY-MM-DD HH:mm')} with these parameters: api secret: ${apiSecret.substring(0, 5)}..., event: "${event}"`);

const randomNumberBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Main method
setInterval(() => {
  console.log(`Waking up at ${moment().format('YYYY-MM-DD HH:mm')}`);
  resetReportDateAndMap();
  // const mixPanelEndpoint = `https://${apiSecret}@mixpanel.com/api/2.0/segmentation?from_date=${reportDateString}&to_date=${reportDateString}&event=${event}`;
  const mixPanelEndpoint = `https://mixpanel.com/api/2.0/segmentation?from_date=${reportDateString}&to_date=${reportDateString}&event=${event}`;
  const headers = {
    username: apiSecret,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": true,
  };

  // TODO: fetch fails with this error: Request header field username is not allowed by Access-Control-Allow-Headers in preflight response.
  fetch(mixPanelEndpoint, {headers})
    .then(response => {
      return response.json();
    })
    .then(jsonResponse => {
      const count = jsonResponse.data.values[event][reportDateString];
      console.log(`${event} count: ${count}, date: ${reportDateString}`);

      // if count hits 10, then play gangnam style
      if (shouldPlaySong(count)) {
        const playList = YT_PLAYER.getPlaylist();

        if (playList && playList.length > 0) {
          // GOTCHA: shuffle and loop must be set AFTER the first video played! This is a known youtube bug:
          // http://stackoverflow.com/questions/15866979/youtube-api-playlist-shuffle-not-working
          YT_PLAYER.setShuffle(true);
          YT_PLAYER.setLoop(true);

          // play next
          console.log(`playlist exist, playing next`);
          YT_PLAYER.nextVideo();

          const startSeconds = randomNumberBetween(30, 120);
          console.log(`startSeconds: ${startSeconds}`);

          // YESSSSSS!!!
          YT_PLAYER.seekTo(startSeconds, true);
          setTimeout(() => YT_PLAYER.stopVideo(), PLAYBACK_DURATION_SECONDS * 1000);
          return;
        }

        console.log(`playlist doesn't exist, initialising`);

        YT_PLAYER.loadPlaylist({
          list: PLAYLIST_ID,
          listType: 'playlist',
          startSeconds: 30,
          suggestedQuality: 'small',
        });
      } else {
        console.log('Nothing to do, going back to sleep...');
      }
    })
    .catch(e => console.log(`Error occurred: ${e}`));
}, POLLING_INTERVAL_SECONDS * 1000);

const resetReportDateAndMap = () => {
  let today = moment();
  const todayString = today.format('YYYY-MM-DD');
  console.log(`todayString: ${todayString}, reportDateString: ${reportDateString}`);

  if (reportDateString !== todayString) {
    console.log('It\'s  brand new day! reset the reporting date and clear all flags');
    // It's  brand new day! reset the reporting date and clear all flag
    reportDateString = todayString;
    map.clear();
  } else {
    console.log(`same day, so not resetting anything`);
  }
};

const shouldPlaySong = count => {
  // check if we have played mp3 in this block
  const thCount = getThCount(count);

  // don't play anything if 0
  if (thCount === 0) {
    console.log(`count is below ${STEP_SIZE}, don't play anything`);
    return false;
  }

  // console.log(`looking at the ${thCount}th sales`);
  const hasBeenPlayed = map.get(thCount);

  console.log(`hasBeenPlayed for ${thCount}th sales? ${hasBeenPlayed}`);
  return !hasBeenPlayed;
};

const getThCount = (count) => {
  return Math.floor(count / STEP_SIZE);
};

/**
 * Instead of rendering your root component directly, you render the Router component with routes attribute
 * specified so we can match urls and render matching components using the routes declared in common/route.js.
 * The history attribute tells react router to use html5 history api as opposed to hash history.
 * Html5 history api is preferable to hash history because it keeps the url clean e.g. "/contact" as opposed
 * to "/#/contact"
 */
render(
  <Provider store={createStore()}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('reactDiv')
);

