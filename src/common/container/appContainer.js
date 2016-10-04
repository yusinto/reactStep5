import React, {Component} from 'react';
import AppComponent from '../component/appComponent';
import ldConnect from '../../ld-redux/decorator';

@ldConnect()
export default class AppContainer extends Component {
  render() {
    return <AppComponent {...this.props} />;
  }
}