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

app.set(`view engine`, `pug`);
app.set(`views`, `${__dirname}/templates`);

app.use(`/login`, loginRoutes);
app.use(`/register`, registerRoutes);
app.use(`/search`, searchRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT);
