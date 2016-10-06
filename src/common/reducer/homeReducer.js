import Constants from '../constant';

const defaultState = {
  someRandomNumber: 0,
  something: '',
};

export default function App(state = defaultState, action) {
  switch (action.type) {
    case Constants.GENERATE_RANDOM:
      return Object.assign({}, state, {someRandomNumber: action.data});

    case Constants.SAY_SOMETHING:
      return Object.assign({}, state, {something: action.data});

    default:
      return state;
  }
}