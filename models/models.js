//Cargar Path 
var path = require('path');
//Cargar Modelo ORM
var Sequelize = require('sequelize');


//Usar BBDD SQLite: Gestor de y Fichero de Datos 
var sequelize = new Sequelize(null, null, null,
                              { dialect: "sqlite",storage: "quiz.sqlite"}
                 );
				 
// Importar la definición de la tabla Quiz en quiz.js  --- path crea la ruta al objeto
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // Exporta definición de tabla Quiz

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(
  // Esto se Ejecuta una vez creada la tabla
  function() {
	   Quiz.count().success(
	      function (count) {
			  // Comprueba que la tabla esté vacia
			  if (count === 0) {
				  Quiz.create({ pregunta: 'Capital de Italia',
				                 respuesta: 'Roma'
					         }).success(function() {console.log('Base de datos inicializada')});
			  };
		  }
	   );
	  
  }
);

