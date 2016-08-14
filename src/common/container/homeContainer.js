import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../action/homeAction';
import HomeComponent from '../component/homeComponent';

const mapStateToProps = (state) => {
  const homeState = state.Home;

  return {
    randomNumber: homeState.randomNumber
  };
};

@connect(mapStateToProps, Actions)
export default class AppContainer extends Component {
  render() {
    return <HomeComponent {...this.props} />;
  }
}