import Constants from '../constant';

const defaultState = {
  someRandomNumber: 0
};

export default function App(state = defaultState, action) {
  switch (action.type) {
    case Constants.GENERATE_RANDOM:
      return Object.assign({}, state, {someRandomNumber: action.data});

    default:
      return state;
  }
}