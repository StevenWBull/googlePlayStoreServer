const express = require('express');
const morgan = require('morgan');

const googleApps = require('./playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  res.json('I\'m running');
})