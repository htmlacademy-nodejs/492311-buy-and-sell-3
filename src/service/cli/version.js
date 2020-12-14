'use strict';
const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);
const {messageColor} = require(`../../utils`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    console.log(chalk[messageColor.info](version));
  }
};


