import React, {Component} from 'react';
import HomeComponent from '../component/homeComponent';
import ldConnect from '../../ld-redux/decorator';
import * as actions from '../action/homeAction';

const mapStateToProps = (state) => {
  const homeState = state.Home;
  return {
    someRandomNumber: homeState.someRandomNumber,
  };
};

@ldConnect(mapStateToProps, actions, {'random-number': false})
export default class HomeContainer extends Component {
  render() {
    return <HomeComponent {...this.props} />;
  }
};