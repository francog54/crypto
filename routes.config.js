const UsuariosController = require('./controllers/usuarios.controller');
const CriptomonedasController = require('./controllers/criptomonedas.controller');
const ValidationMiddleware = require('./common/middlewares/auth.validation.middleware');
const config = require('./common/config/env.config');

exports.routesConfig = function (app) {
    
    app.post('/usuarios', [
        UsuariosController.insert
    ]);

    app.patch('/usuarios/:usuarioId', [
        ValidationMiddleware.validJWTNeeded,
        UsuariosController.patchById
    ]);

    app.get('/getCriptomonedas/:n', [
        ValidationMiddleware.validJWTNeeded,
        UsuariosController.getCriptomonedas
    ]);

 
   /*
    app.get('/usuarios', [
        ValidationMiddleware.validJWTNeeded,
        UsuariosController.list
    ]);
 
  
  app.delete('/usuarios/:usuarioId', [
        ValidationMiddleware.validJWTNeeded,
        UsuariosController.removeById
    ]);*/

  
    app.post('/criptomonedas', [
        CriptomonedasController.insert
    ]);
     
    app.get('/criptomonedas', [
        CriptomonedasController.list
    ]);
  
    app.get('/criptomonedas/:criptomonedaId', [
        ValidationMiddleware.validJWTNeeded,
        CriptomonedasController.getById
    ]);
    app.patch('/criptomonedas/:criptomonedaId', [
        ValidationMiddleware.validJWTNeeded,
        CriptomonedasController.patchById
    ]);
    app.delete('/criptomonedas/:criptomonedaId', [
        ValidationMiddleware.validJWTNeeded,
        CriptomonedasController.removeById
    ]);
};
