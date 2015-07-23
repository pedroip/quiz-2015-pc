var express = require('express');
var router = express.Router();

/* Cargamos el nuevo Controlador */
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) { 
  /* Renderiza la Vista Quiz sin controlador  */	
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res) { 
  /* Creditos de la Web  */	
  res.render('author', { title: 'Creditos' });
});

// Añadimos las Rutas de Quizes
router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);


module.exports = router;
