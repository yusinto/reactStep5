import ldClient from 'ldclient-js';
import Constants from '../constant';

export const setLDReady = ldClient => {
  return {
    type: Constants.LD_READY,
    data: ldClient
  }
};

export const initialiseLD = () => {
  return dispatch => {
    const user = {'key': Math.random()};
    const client = ldClient.initialize('57a55163b14b9907200fa40e', user);

    client.on('ready', () => {
      dispatch(setLDReady(client));
    });
  };
};