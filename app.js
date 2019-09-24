const express = require('express');
const morgan = require('morgan');

const googleApps = require('./playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { search, sort } = req.query;

  const sortParams = ['rating', 'app'];
  const searchParams = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];

  if (sort && !sortParams.includes(sort)) {
    return res.status(400).json('Error: sort must be by rating or app');
  }

  if (search && !searchParams.includes(search.toLowerCase())) {
    return res.status(400).json('Error: please search by a valid genre. Such as: action, puzzle, strategy, casual, arcade, or card');
  }

  res.json(googleApps);
})

app.listen(8000, () => console.log('Server started on port 8000'));