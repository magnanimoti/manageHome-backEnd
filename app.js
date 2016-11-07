var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SocketServer = require('./app/comunicacao/socketServer');

var routes = require('./app/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
//----------------------------------------

 var test = new SocketServer();
 // var server = net.createServer();  
 // server.on('connection', test.handleConnection());

 // server.listen(9000, function() {  
	// console.log('server listening to %j', server.address());
 // });

// server.listen(9000, function() {  
//   console.log('server listening to %j', server.address());
// });
// function handleConnection(conn) {  
//   var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
//   console.log('new client connection from %s', remoteAddress);

//   conn.on('data', onConnData);
//   conn.once('close', onConnClose);
//   conn.on('error', onConnError);

//   function onConnData(d) {
//     console.log('connection data from %s: %j', remoteAddress, d);
//     console.log(d.toString());
//     //conn.write(d);
//   }

//   function onConnClose() {
//     console.log('connection from %s closed', remoteAddress);
//   }

//   function onConnError(err) {
//     console.log('Connection %s error: %s', remoteAddress, err.message);
//   }
// }
//---------------------


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
