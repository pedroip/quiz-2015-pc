//Cargamos el Modelo de BBDD para poder Trbajar con el 
var models = require('../models/models.js');

// Autoload - factoriza el codigo
exports.load = function (req,res,next,quizId) {
	models.Quiz.find(quizId).then(
	   function(quiz) {
		   if (quiz) {
			   req.quiz=quiz;
			   next();
		   } else {
			   next(new Error('No existe quizId='+quizId))
		   }
	   }
	).catch(function(error) {next(error);} );
};


// Creamos las propiedades del controlador quiz 

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
	  	res.render('quizes/index', { quizes: quizes });
	}).catch(function(error) {next(error);} );
};


// GET /quizes/:id
exports.show = function(req, res) {
  console.log('Buscando ................ '+req.params.quizId);	
  models.Quiz.find(req.params.quizId).then(function(quiz) {
	    console.log('valor de quiz.id'+quiz.id);
	  	res.render('quizes/show', { quiz: quiz });
	}).catch (function(error) {next(error);} );
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
	  if (req.query.respuesta === quiz.respuesta) {
		   res.render('quizes/answer', {quiz:quiz, respuesta: 'Correcto'});
	  } else {
		   res.render('quizes/answer', {quiz:quiz, respuesta: 'Incorrecto'});
	  }
	})
};



