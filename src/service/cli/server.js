'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {
  MessageColor,
  HttpCodes
} = require(`../../utils`);

const DEFAULT_PORT = 3000;
const filePath = `mocks.json`;

const sendResponse = (res, code, headers, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();
  res.statusCode = code;
  res.writeHead(headers);
  res.end(template);
};


const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;
  switch (req.url) {
    case `/`:
      try {
        const content = await fs.readFile(filePath);
        const mocks = JSON.parse(content);
        const message = mocks.map((i) => {
          return `<li>${i.title}</li>`;
        }).join(``);
        sendResponse(res, HttpCodes.OK, {'Content-type': `text/html; charset=UTF-8`}, `<ul>${message}</ul>`);
      } catch (e) {
        sendResponse(res, HttpCodes.NOT_FOUND, {'Content-Type': `text/plain; charset=UTF-8`}, notFoundMessageText);
      }
      break;
    default:
      sendResponse(res, HttpCodes.NOT_FOUND, {'Content-Type': `text/plain; charset=UTF-8`}, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    http.createServer(onClientConnect).listen(port).on(`listening`, (err) => {
      if (err) {
        return console.error(chalk[MessageColor.error]`Ошибка при создании сервера`, err);
      }
      return console.info(chalk[MessageColor.success](`Ожидаю соединений на ${port}`));
    });
  }
};
