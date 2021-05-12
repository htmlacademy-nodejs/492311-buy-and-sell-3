'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/`, (req, res) => {
  res.render(`ticket/my-tickets`);
});

offersRouter.get(`/add`, (req, res) => {
  res.render(`ticket/new-ticket`);
});

offersRouter.get(`/:id`, (req, res) => {
  res.render(`ticket/ticket`);
});

offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`categories/category`);
});

offersRouter.get(`/edit/:id`, (req, res) => {
  res.render(`ticket/ticket-edit`);
});

module.exports = offersRouter;
