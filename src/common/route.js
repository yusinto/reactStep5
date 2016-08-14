import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './container/appContainer';
import Home from './container/homeContainer';
import Contact from './component/contactComponent';

const routes =
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/contact" component={Contact}/>
  </Route>;

export default routes;