//Cargar Path 
var path = require('path');


//Adaptamos el PATH a la plataforma de ejecución

// DATABASE_URL Variable de la Base de Datos en Local y Heroku
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);

// DATABASE_STORAGE Solo para Entorno Local
var storage = process.env.DATABASE_STORAGE;


//Cargar Modelo ORM
var Sequelize = require('sequelize');


//Usar BBDD SQLite: Gestor de y Fichero de Datos
//Usar Postges
//Depende de las Variables
 
/* 
 var sequelize = new Sequelize(null, null, null,
                              { dialect: "sqlite",storage: "quiz.sqlite"}
                 );
*/

var sequelize = new Sequelize(DB_name,user,pwd,
                              {dialect: protocol,
							   protocol: protocol,
							   port:port,
							   host:host,
							   storage: storage, //Solo SQLite
							   omitNull: true    //Solo Postfres
							  } 
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

