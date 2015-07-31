//Controlador Sin Acceso al Modelo con las Funciones de Identicar Usuarios

// Objeto de usuarios a modo de DDBB interna
var users = { admin: {id:1,username:"Administrador",password:"1234"},
              pedro: {id:2,username:"Pedro IP",password:"hola"}
            }
			
//Metodo de auteticar
//Utilizamos el metodo de callback, ejecutar una función a la que se le pasan lo paramentros de error y objeto login 
exports.autenticar = function (login,password,callback) {
	
	if (users[login]) {
		if (password===users[login].password) {
			// TaChán
			callback(null,users[login]);
		} else {
			// Password Fallido
			callback(new Error('Password Erroneo.'));
		}
	} else {
		   // No Existe
		callback(new Error('No existe el usuario'));
	}
	
	
	
};			
			