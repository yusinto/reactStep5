import React, {PropTypes, Component} from 'react';
import camelCase from 'lodash/camelCase';
import {connect} from 'react-redux';
import * as actionCreators from './actions';


export default (m, a, flags) => (WrappedComponent) => {
  const mapStateToProps = state => {
    const o = m ? m(state) : {};
    const ldState = state.LD;

    if (flags) {
      const c = {};

      for (const key in flags) {
        const camelCaseKey = camelCase(key);
        c[camelCaseKey] = ldState[camelCaseKey];
      }

      return {
        isLDReady: ldState.isLDReady,
        ...c,
        ...o,
      };
    }

    return {
      isLDReady: ldState.isLDReady,
      ...o,
    };
  };

  @connect(mapStateToProps, {...a, ...actionCreators})
  class WithFeatureFlags extends Component {
    static propTypes = {
      isLDReady: PropTypes.bool,
    };

    componentDidMount() {
      if (this.props.isLDReady) {
        this.initialise();
      }
    }

    componentWillReceiveProps(newProps) {
      if (newProps.isLDReady && !this.props.isLDReady) {
        this.initialise();
      }
    }

    initialise = () => {
      this.props.initialiseFlags(flags);
    };

    render() {
      return (
        <div>
          <WrappedComponent
            {...this.props}
          />
        </div>
      );
    }
  }

  return WithFeatureFlags;
};
