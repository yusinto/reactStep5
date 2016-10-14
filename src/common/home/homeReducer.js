import Constants from '../constant';

const defaultState = {
  randomNumber: 0
};

export default function App(state = defaultState, action) {
  switch (action.type) {
    case Constants.GENERATE_RANDOM:
      return Object.assign({}, state, {randomNumber: action.data});

    default:
      return state;
  }
}