var express = require('express');
var router = express.Router();

/* Cargamos el nuevo Controlador */
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) { 
  /* Renderiza la Vista Quiz sin controlador  */	
  res.render('index', { title: 'Quiz' });
});

/* Añadimos nuevas rutas que llaman a Controladores */
router.get('/quizes/question',quizController.question);
router.get('/quizes/answer',quizController.answer);

 
module.exports = router;
