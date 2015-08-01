//Cargamos el Modelo de BBDD para poder Trabajar con el 
var models = require('../models/models.js');


exports.load = function(req,res,next,commentId) {
	models.Comment.find(commentId)
	 .then( function(comment) {
		      if (comment) {
				  req.comment = comment;
				  next();
			  } else {
				  next( new Error('No exites el CommentId='+CommentId));
			  }
	      })
	     .catch(function(error) { next(error); } );
};



exports.new = function(req, res) {
    res.render('comments/new', {quiz: req.quiz, comment:{texto:'Deja tu Comentario aquí'} ,errors:[]});
};

exports.create = function(req, res) {

	// Crea el Objeto con los Valores obtenidos del formulario y el parámetro quizId:
	var comment = models.Comment.build({ texto:req.body.comment.texto, QuizId: req.params.quizId });
	
	// Aplicamos la Validación
	var err=comment.validate();
	
	// Analizamos el Resultado
    if (err) {
	   //Hay Erroes 	
	   var i=0; var errores=new Array();
       for (var prop in err) errores[i++]={message: err[prop]};
   	   res.render('comments/new', {quiz: req.quiz, comment: comment, errors: errores});
    } else {
	   //Todo OK
 	   comment.save({fields:["texto","QuizId"]})
	      .then(function() { res.redirect('/quizes/'+req.params.quizId); }) 
		     .catch(function(error) { next(error); } );
    }
	
};

exports.publish = function(req,res) {
	
	//Modifica el valor del registro cargado con .load
	req.comment.publicado = true;
	
	//Aplicar la Modificación
	req.comment.save( {fields:["publicado"]})
	  .then( function() {res.redirect('/quizes/'+req.params.quizId);})
	    .catch(function(error) { next(error); } );

}; 
