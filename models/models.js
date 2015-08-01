//Cargar Path 
var path = require('path');


//Partche para P9
process.env.DATABASE_URL = "sqlite://:@:/";


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
		
// --------------------------------------------------------------		

// Importar la definición de la tabla Quiz en quiz.js  --- path crea la ruta al objeto
var Quiz = sequelize.import(path.join(__dirname,'quiz')); 
var Comment = sequelize.import(path.join(__dirname,'comment')); 

//Relaciones entre las Tablas
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // Exporta definición de tabla Quiz
exports.Comment = Comment; 



// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(
  // Esto se Ejecuta una vez creada la tabla
  function() {
	   console.log('Sincronizando Fianlizado ... contando datos'); 
	   Quiz.count().success(
	      function (count) {
			  // Comprueba que la tabla esté vacia
			  console.log('Regitros en la base de datos: '+count);
			  if (count === 0) {
				  Quiz.create({ pregunta: 'Capital de Portugal',respuesta: 'Lisboa',tema: 'otro'
					         }).success(function() {console.log('Base Lisboa OK')});
				  Quiz.create({ pregunta: 'Capital de Italia', respuesta: 'Roma',tema: 'otro' 
					         }).success(function() {console.log('Base Roma OK')});
               	  Quiz.create({ pregunta: 'Nombre ("Solo Nombre") del descubridor de America', respuesta: 'Cristobal', tema:'humanidades'
					         }).success(function() {console.log('Base Cristobal OK')});
                  Quiz.create({ pregunta: '¿Cual es el ORM que usamos com Express para le Modelo?', respuesta: 'Sequelize', tema:'tecnologia'
					         }).success(function() {console.log('Base Express OK')});							 
			  };
		  }
	   );
	  
  }
);

