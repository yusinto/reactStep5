export const homeFlags = {
  'wellness-red-font': false,
  'wellness-aggressive-content': false
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
