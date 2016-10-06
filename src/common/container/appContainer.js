import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppComponent from '../component/appComponent';

const mapStateToProps = (state) => {
  return {
    isLDReady: state.LD.isLDReady,
  };
};

@connect(mapStateToProps)
export default class AppContainer extends Component {
  render() {
    return <AppComponent {...this.props} />;
  }
}