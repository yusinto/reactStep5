import Constants from '../constant';

const defaultState = {
  isLDReady: false,
  ldClient: null,
};

export default function App(state = defaultState, action) {
  switch (action.type) {
    case Constants.LD_READY:
      return Object.assign({}, state, {isLDReady: true, ldClient: action.data});

    default:
      return state;
  }
}