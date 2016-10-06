import Constants from '../constant';

export const saySomething = (s) => {
  return {
    type: Constants.SAY_SOMETHING,
    data: s,
  }
};