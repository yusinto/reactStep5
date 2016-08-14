import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as AppActions from '../action/appAction';
import AppComponent from '../component/appComponent';

const mapStateToProps = (state) => {
  const appState = state.App;

  return {
    isLDReady: appState.isLDReady
  };
};

@connect(mapStateToProps, AppActions)
export default class AppContainer extends Component {
  render() {
    return <AppComponent {...this.props} />;
  }
}