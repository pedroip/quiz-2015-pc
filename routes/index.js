var express = require('express');
var router = express.Router();

/* Cargamos los Controladores */
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');




/* GET home page. */
router.get('/', function(req, res) { 
  /* Renderiza la Vista Quiz sin controlador  */	
  res.render('index', { title: 'Quiz',errors:[] });
});

router.get('/author', function(req, res) { 
  /* Creditos de la Web  */	
  res.render('author', { title: 'Creditos',errors:[] });
});


//Autocarga de comandor con :quizId
router.param('quizId',quizController.load);
router.param('commentId',commentController.load);

// Añadimos las Rutas 
router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

router.get('/quizes/new',					sessionController.loginRequirez, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit',	sessionController.loginRequirez, quizController.edit);
router.put('/quizes/:quizId(\\d+)',			sessionController.loginRequirez, quizController.update);
router.delete('/quizes/:quizId(\\d+)',		sessionController.loginRequirez, quizController.delete);
router.post('/quizes/create',				sessionController.loginRequirez, quizController.create);


router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 	    commentController.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequirez, commentController.publish);



router.get('/login',						sessionController.new); // Formulario de Login
router.get('/logout',						sessionController.logout); // Formulario de Login
router.post('/login',						sessionController.create); // Respuesta Formulario de Login



module.exports = router;
