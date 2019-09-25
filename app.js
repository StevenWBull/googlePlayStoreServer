const express = require('express');
const morgan = require('morgan');

const googleApps = require('./playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const search = req.query.search;
  const sort = req.query.sort;

  const sortParams = ['rating', 'app'];
  const searchParams = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];

  if (sort && !sortParams.includes(sort)) {
    return res.status(400).json('Error: sort must be by rating or app');
  }

  if (search && !searchParams.includes(search.toLowerCase())) {
    return res.status(400).json('Error: please search by a valid genre. Such as: action, puzzle, strategy, casual, arcade, or card');
  }

  let results = googleApps;

  if (search) {
    results = googleApps.filter( apps => apps.Genres.toLowerCase().includes(search.toLowerCase()) );
  }

  if (sort) {
    const newSort = sort.charAt(0).toUpperCase() + sort.slice(1).toLowerCase();
    results = results.sort(( a, b ) => a[newSort] < b[newSort] ? 1 : a[newSort] > b[newSort] ? -1 : 0);
  }

  res.json(results);
})

module.exports = app;