var express = require('express');
var physio = require('./routes/OH1');
var app = express();
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
app.listen(2021);
console.log('Listening on port 2021...');