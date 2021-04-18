const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => {
  res.send(`/offers/add`)
});

offersRouter.get(`/:id`, (req, res) => {
  const id = req.params['id'];
  res.send(`/${id}`)
});

offersRouter.get(`/category/:id`, (req, res) => {
  const id = req.params['id'];
  res.send(`/category/${id}`)
});

offersRouter.get(`/edit/:id`, (req, res) => {
  const id = req.params['id'];
  res.send(`/edit/${id}`)
});


module.exports = offersRouter;