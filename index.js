// import dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./server/router');
const mongoose = require('mongoose');
const cors = require('cors');

// Set up Database
mongoose.connect('mongodb://localhost:loretracker/loretracker');

// Set up app
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

app.use(express.static(__dirname + "/public"));

app.get('*', function(req, res) {
  res.sendFile(`${process.cwd()}/public/index.html`);
});

// Set up server
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);