const express = require('express');
const morgan = require('morgan');

const googleApps = require('./playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {

  
  res.json(googleApps);
})

app.listen(8000, () => console.log('Server started on port 8000'));