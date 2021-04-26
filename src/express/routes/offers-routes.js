'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => {
  res.send(`/offers/add`);
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
