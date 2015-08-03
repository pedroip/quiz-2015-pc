//Cargamos el Modelo de BBDD para poder Trabajar con el 
//No es Necesario por que no necesita el modelo de datos para nada ....
//var models = require('../models/models.js');

exports.loginRequirez = function(req,res,next) {
 	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};



exports.new = function(req,res) {
	
	//Pasa los errores de forma indirecta por variable de session
	
	var errors = req.session.errors || {};
	req.session.errors={};
	
	// Retorna el Formulario de Logín
	
	
	res.render('sessions/new',{errors:errors});
	
};

exports.create = function(req,res) {
	
	//Captación de los campos del formulario
	var login = req.body.login;
	var password = req.body.password;
	
	//Metodo directo sin controlador de Autentificación
	/*
	if ((login=='pedro') && (password=='123')) {
		//Crear la variable de sesion req.session.user con id y username
		//Si existe esta variable es que hay sesion ;)
		req.session.user={id:1, username: 'Pedro Casas'};
		//Nos vamos de nuevo a la página desde fuimos invocados
		res.redirect(req.session.redir.toString());
	} else {
		//Error de Autentificación
		req.session.errors=[{"message":"Error al Autentificar"}];
		//Se usa la Variable de Sesión al no poder pasar los errores de forma directa por ser un redirección
		res.redirect('/login');
	}
	*/
	
	//Metodo con Control de usuarios
	
	//Cargamos el controlador de usuarios para ver la autentificación, solo desdes aqui para no cargar el sistema
	var userController = require('./user_controller');
	
	//Pasamos  Login, Password y Función de Retorno o adaptable
	userController.autenticar(login,password,function (hayerror,el_user) {
		if (hayerror) {
			req.session.errors=[{"message":"Se ha producido el error: "+hayerror }];
			res.redirect("/login");
			return;
		}
		req.session.user={id:el_user.id , username:el_user.username};
		res.redirect(req.session.redir.toString());
	});
	

};


exports.logout = function(req,res) {
	
	//Destruir las variable de sesion de usuario
    delete req.session.user;
	console.log('TIEMPO DESTRUIDO --------------------');
	delete req.session.sessiontime;
	res.redirect(req.session.redir.toString());
	
};