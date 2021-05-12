'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/404`, (req, res) => {
  res.render(`errors/404`);
});

myRouter.get(`/500`, (req, res) => {
  res.render(`errors/500`);
});

module.exports = myRouter;
