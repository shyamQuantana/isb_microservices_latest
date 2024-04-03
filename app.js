var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var ProgrammeApplicationRouter = require('./app/program_applications/routes.config');

const ErrorLogs = require('./libs/error_logs.js');

var app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


ProgrammeApplicationRouter.routesConfig(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //console.log("error 404");
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //console.log("error here app")

    // render the error page
    res.status(err.status || 500);
    
    
    //res.render('error');
    res.status(500).send({status:500, result:{url:req.url,error:err.message}});
    err.error_message = err.message;
    err.body_parameters = req.body;
    err.api = req.url;
    err.url = req.headers.referer;
    err.ip_address = req.header('x-forwarded-for') ? req.header('x-forwarded-for') : req.connection.remoteAddress;
    err.agent = req.headers['user-agent'];

    if(!!err.agent){
    ErrorLogs.send_to_slack(err).then((slack_result) => {
        //console.log(err);

        console.log("Slack alert sent");
    })
    .catch((slack_err) => {
        console.log(slack_err);
    });
    }

});

module.exports = app;
