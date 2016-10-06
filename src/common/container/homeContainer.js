import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeComponent from '../component/homeComponent';
import * as homeActions from '../action/homeAction';
import * as appActions from '../action/appAction';

import {getFlagsFromState, mapActionsToProps, ldConnect} from '../../ld-redux';

// These must be the keys you set up in launch darkly dashboard (kebab-lower-cased)
const defaultFlags = {'random-number': false};

const mapStateToProps = (state) => {
  const homeState = state.Home;

  // Use helper method to subscribe to your flags as camelCased props
  const flags = getFlagsFromState(state, defaultFlags);

  return {
    someRandomNumber: homeState.someRandomNumber,
    something: homeState.something,
    ...flags,
  };
};

// Use helper method to create mapDispatchToProps, passing your actions to the helper method
@connect(mapStateToProps, mapActionsToProps(homeActions, appActions))
@ldConnect(defaultFlags) // connect the component to the feature flags it needs
export default class HomeContainer extends Component {
  render() {
    return <HomeComponent {...this.props} />;
  }
};