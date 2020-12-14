'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [arr[i], arr[randomPosition]] = [arr[randomPosition], arr[i]];
  }
  return arr;
};

const messageColor = {
  error: `red`,
  success: `green`,
  info: `blue`,
  help: `grey`
};

module.exports = {
  getRandomInt, shuffle, messageColor
};
