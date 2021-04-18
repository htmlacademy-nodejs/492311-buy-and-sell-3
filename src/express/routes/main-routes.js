const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => {
  res.send(`/main`)
});

module.exports = mainRouter;