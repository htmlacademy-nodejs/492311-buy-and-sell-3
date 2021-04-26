const {Router} = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => {
  res.render(`./auth/sign-up`)
});

module.exports = registerRouter;