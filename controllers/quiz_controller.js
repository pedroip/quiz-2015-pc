//Cargamos el Modelo de BBDD para poder Trbajar con el 
var models = require('../models/models.js');

// Autoload - Factorizar el codigo
exports.load = function (req,res,next,quizId) {
	console.log('load: bunsacndo ['+quizId+']');
	models.Quiz.find(quizId).then(
	   function(quiz) {
		   console.log('load: fin bunqueda.');
		   if (quiz) {
			   console.log('load: Localizado.');
			   req.quiz=quiz;
			   next();
		   } else {
			   console.log('load: NO Localizado.');
			   next(new Error('No existe quizId:'+quizId));
		   }
	   }
	).catch(function(error)	{
		         next(error);
			} );
};


// Creamos las propiedades del controlador quiz 

// GET /quizes
exports.index = function(req, res) {
  console.log('Controlador: index');	
  models.Quiz.findAll().then(function(quizes) {
	  	res.render('quizes/index', { quizes: quizes });
	}).catch(function(error) { next(error); } );
};


// GET /quizes/:id
exports.show = function(req, res) {
  console.log('Controlador: show . Parametro quizId '+req.params.quizId);

  //Suponemos que req.quiz ya se cargo en el objeto con premura en .load.  
  res.render('quizes/show', {quiz: req.quiz});
  
  /* Codigo Sustituido por .load
  models.Quiz.find(req.params.quizId).then(function(quiz) {
	  
	    if (quiz) { // Tiene Valor. Localizado
		   console.log('valor de quiz.id:'+quiz.id);
	  	   res.render('quizes/show', { quiz: quiz });
		} else {  // No Tiene Valor. No Localizado . null 
		    console.log('valor No localizado: '+req.params.quizId);
		    next(new Error('No existe quizID.'+req.params.quizId));
		}
	
	});
   */	
};


//GET /quizes/:id/answer
exports.answer = function(req, res) {
	
  /* Codigo Pre Load 	
  models.Quiz.find(req.params.quizId).then(function(quiz) {
	  if (req.query.respuesta === quiz.respuesta) {
		   res.render('quizes/answer', {quiz:quiz, respuesta: 'Correcto'});
	  } else {
		   res.render('quizes/answer', {quiz:quiz, respuesta: 'Incorrecto'});
	  }
	});
  */

  var resultado = 'Incorrecto'; 
  if  (req.query.respuesta === req.quiz.respuesta) {
	 resultado = 'Correcto';
  } 
  res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado});
  
};



