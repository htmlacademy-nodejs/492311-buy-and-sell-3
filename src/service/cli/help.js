'use strict';
const chalk = require(`chalk`);
const {MessageColor} = require(`../../utils`);

const helpText = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>
    
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json с указанным количеством
    --server <port>    запускает сервер по указанному порту
  `;


module.exports = {
  name: `--help`,
  run() {
    console.log(chalk[MessageColor.help](helpText));
  }
};


