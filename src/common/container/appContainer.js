import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppComponent from '../component/appComponent';
import ldConnect from '../../ld-redux/decorator';
import * as ldActions from '../../ld-redux/actions';
import {getFlagState} from '../../ld-redux/reducer';

const mapStateToProps = (state) => {
  const ldState = getFlagState(state);

  return {
    ...ldState,
  };
};

@connect(mapStateToProps, ldActions)
@ldConnect()
export default class AppContainer extends Component {
  render() {
    return <AppComponent {...this.props} />;
  }
}