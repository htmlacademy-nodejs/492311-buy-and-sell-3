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
  const id = req.params[`id`];
  res.render(`ticket/ticket`);
});

offersRouter.get(`/category/:id`, (req, res) => {
  const id = req.params[`id`];
  res.send(`/category/${id}`);
});

offersRouter.get(`/edit/:id`, (req, res) => {
  const id = req.params[`id`];
  res.render(`ticket/ticket-edit`);
});


module.exports = offersRouter;
