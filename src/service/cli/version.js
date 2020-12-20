'use strict';
const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);
const {MessageColor} = require(`../../utils`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    console.log(chalk[MessageColor.info](version));
  }
};


