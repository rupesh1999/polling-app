const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const cors = require('cors');
var port = 3000;
var app = express();
var poll = require('../routes/poll.js');
require('../config/db.js');

app.use(express.static(path.join(__dirname , '../public')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false}));
app.use(cors());

app.use('/polls' , poll);

app.listen(port , () => {
    console.log(`server started at port number ${port}`);
});