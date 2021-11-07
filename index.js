const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
mongoose.connect(
  'mongodb://localhost/modals-validator',
  { useNewUrlParser: true },
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('connected to the database');
});

app.use(express.urlencoded());
app.use(express.json());

app.use('/', require('./routes'));

app.listen(port, (err, res) => {
  if (err) {
    console.log(`error to fire up the server: ${err}`);
    return;
  }
  console.log(`server is running on port : ${port}`);
});

module.exports = app;