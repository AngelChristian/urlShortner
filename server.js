const express = require('express');
const Sentry = require('@sentry/node');
require('dotenv').config();
const mongoose = require('mongoose');
const ShortUrl = require('./models/url');
const app = express();

// sentry config for error tracking
Sentry.init({
  dsn: process.env.SENTRY,
});
app.use(Sentry.Handlers.requestHandler());

// mongoose connection
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(Sentry.Handlers.errorHandler());

// Routes
const urlRoute = require('./routes/url');

app.use('/', urlRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('App is running');
});
