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
exports.index = function(req, res, next) {
  console.log('Controlador: index');
  
  var busqueda = {};
  if (req.query.search) {
	 var cadena = '%'+req.query.search.replace(/\s/g,"%")+'%';
	 busqueda = {where:["upper(pregunta) like upper(?)",cadena]};  
  } 
  
  models.Quiz.findAll(busqueda).then(function(quizes) {
	  	res.render('quizes/index', { quizes: quizes , busqueda: req.query.search || '', errors:[] });
	}).catch(function(error) { next(error); } );
};


// GET /quizes/:id
exports.show = function(req, res) {
  console.log('Controlador: show . Parametro quizId '+req.params.quizId);

  //Suponemos que req.quiz ya se cargo en el objeto con premura en .load.  
  res.render('quizes/show', {quiz: req.quiz, errors:[]});
  
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
  res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado, errors:[]});
  
};


// GET /quizes/new
exports.new = function(req, res) {
  console.log('Controlador: new');

  //Crea objeto quiz vacio + los valores pasados en parametros - Valores Iniciales
  var quiz = models.Quiz.build({pregunta:'Pregunta', respuesta:'Respuesta'});
    
  //Llamamos a la vistas con los valores iniciales. 
  res.render('quizes/new', {quiz: quiz,errors:[]});
  	
};

// POST /quizes/create
exports.create = function(req, res) {
  console.log('Controlador: create');

  //Crea objeto quiz vació + los valores pasados en parámetros  ( Valores Iniciales body/post del formulario )
  var quiz = models.Quiz.build(req.body.quiz);
  
  /* Añadir Sin Controlar Errores
   quiz.save({fields:["pregunta","respuesta"]}).then(function() {
	                                                    res.redirect('/quizes');
                                                      })
  */  	 	
  var err=quiz.validate();
  if (err) {
	 var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
     for (var prop in err) errores[i++]={message: err[prop]}; 
 	res.render('quizes/new', {quiz: quiz, errors: errores});
  } else {
	// Guarda los campos si la validación es correcta
 	quiz.save({fields:["pregunta","respuesta"]}).then(function() { res.redirect('/quizes'); }); 
  }
		 		
};





