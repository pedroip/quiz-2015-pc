var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Semilla para kukis'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


//Helper dinamicos:
app.use(function(req,res,next){
	//Verificar el Tiempo de Sesion , Si hay Sesion Clato
	if  (req.session.user) {
		if (req.session.sessiontime) {
		    var ahora=new Date().valueOf();
			//Han pasado mas de 2 minutos 2*60 Segundos
			console.log('Fecha Actual:'+ahora);
			req.session.sessiontime=req.session.sessiontime+(60*1000);
			console.log('Fecha Ultimo Acceso +60s:'+req.session.sessiontime);
            console.log('Fecha Diferencia:'+(req.session.sessiontime-ahora));
             
			if (ahora > req.session.sessiontime) {
				console.log('Redireccoionado a Logout.........');				
				res.redirect('/logout');
				//Esto no se Puede Hacer : Can't set headers after they are sent.
				//delete req.session.user;
				next();
			}
		}
		console.log('Reinicio del Tiempo.');
        req.session.sessiontime = new Date().valueOf();		
	} else if (req.session.sessiontime) {
		console.log('TIEMPO DESTRUIDO --------------------');
		delete req.session.sessiontime;
	}
	

	//Que no pare la fiesta y continué la ejecución
    next();	
	
});



//Helper dinamicos:
app.use(function(req,res,next){
	//Guardar el Path en sesion.redir para despues de login o logout
	//Es como hacer Go Sub Casero. :) Para los GW-Basic
	if (!req.path.match(/\/login|\/logout/)) {
		req.session.redir = req.path;
	}
	
    //traspasa valores de req a res
    res.locals.session=req.session;
    
	
	//Que no pare la fiesta y continué la ejecución
    next();	
	
});



/* Carga de los Layout */
app.use(partials());

/* Añade el Gestor de Rutas */
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
            error: err, errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
		errors:[]
    });
});


module.exports = app;
