const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const config = require('./config.js');
var cors = require('cors');

//DB setup
mongoose.connect('mongodb://localhost/mansikka');
mongoose.connection.on('connected', function () {
    console.log('connected');
});

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
app.use(cors());
router(app);


//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening:', port)

//dwq