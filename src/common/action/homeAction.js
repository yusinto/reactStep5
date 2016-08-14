import Constants from '../constant';
import {getRandomInt} from '../logic/homeLogic';

export const generateRandom = () => {
  return {
    type: Constants.GENERATE_RANDOM,
    data: getRandomInt(1, 100)
  }
};