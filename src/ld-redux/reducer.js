import Constants from './constants';
import camelCase from 'lodash/camelCase';

const defaultState = {
  isLDReady: false,
};

export const getFlagState = (state, flags) => {
  const ldState = state.LD;
  const c = {};

  if (flags) {
    for (const key in flags) {
      const camelCaseKey = camelCase(key);
      const stateValue = ldState[camelCaseKey];
      c[camelCaseKey] = typeof stateValue === 'undefined' ? flags[key] : stateValue;
    }
  }

  return {
    isLDReady: ldState.isLDReady,
    ...c,
  };
};

export default function ldReducer(state = defaultState, action) {
  switch (action.type) {
    case Constants.LD_READY:
      return Object.assign({}, state, {isLDReady: true});

    case Constants.SET_FLAGS:
      return Object.assign({}, state, action.data);

    default:
      return state;
  }
}