'use strict';

const express = require(`express`);

const loginRoutes = require(`./routes/login-routes`);
const registerRoutes = require(`./routes/register-routes`);
const searchRoutes = require(`./routes/search-routes`);
const offersRoutes = require(`./routes/offers-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();
const path = require(`path`);
const PUBLIC_DIR = `public`;

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`view engine`, `pug`);
app.set(`views`, `${__dirname}/templates`);

app.use(`/login`, loginRoutes);
app.use(`/register`, registerRoutes);
app.use(`/search`, searchRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);
app.use((err, req, res) => {
  res.status(500).render(`errors/500`);
});
app.use((err, req, res) => {
  res.status(404).render(`errors/404`);
});

app.listen(DEFAULT_PORT);
