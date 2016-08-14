// Import the render method from react-dom so we can mount our
// component onto an html element
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from '../common/route';
import {Provider} from 'react-redux';
import createStore from '../common/store';

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
