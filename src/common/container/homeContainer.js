import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import HomeComponent from '../component/homeComponent';
import * as homeActions from '../action/homeAction';

import ldConnect from '../../ld-redux/decorator';
import * as ldActions from '../../ld-redux/actions';
import {getFlagState} from '../../ld-redux/reducer';

const flags = {'random-number': false};

const mapStateToProps = (state) => {
  const homeState = state.Home;
  const ldState = getFlagState(state, flags);
  return {
    someRandomNumber: homeState.someRandomNumber,
    ...ldState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, homeActions, ldActions), dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
@ldConnect(flags)
export default class HomeContainer extends Component {
  render() {
    return <HomeComponent {...this.props} />;
  }
};