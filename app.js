// ES6 Helpers
var path = require('path');
var publicPath = path.join(__dirname, 'public');
var port = process.env.PORT || 3000;

// Express and Webserver
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var http = require('http').Server(app);

// Handlebars
var exphbs = require('express-handlebars');
var helpers = require('handlebars-helpers');
var handlebars = require('handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.use('/static', express.static(publicPath));
app.locals.basedir = path.join(__dirname, 'views');

// Sockets
var io = require('socket.io').listen(http);
var sockets = {}
var games = {}
var connections = require('./api/connections')(io, sockets, games)
io.on('connection', connections);

// Page injection
var iframeReplacement = require('node-iframe-replacement');
app.use(iframeReplacement);

// Register routes and Initializing
var routes = require('./api/routes')(games);
routes(app);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

http.listen(port, function () {
    console.log('Crosswords server started on: ' + port);
});