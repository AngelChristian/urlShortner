const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/url');
const app = express();

// mongoose connection
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const urlRoute = require('./routes/url');

app.use('/', urlRoute);

module.exports = app;
