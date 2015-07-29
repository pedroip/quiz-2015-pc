var express = require('express');
var router = express.Router();

/* Cargamos el nuevo Controlador */
var quizController = require('../controllers/quiz_controller');

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

// Añadimos las Rutas de Quizes
router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit',	quizController.edit);
router.put('/quizes/:quizId(\\d+)',			quizController.update);
router.delete('/quizes/:quizId(\\d+)',		quizController.delete);
router.get('/quizes/new',					quizController.new);
router.post('/quizes/create',				quizController.create);
module.exports = router;
