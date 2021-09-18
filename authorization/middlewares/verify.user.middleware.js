const UsuarioModel = require('../../models/usuarios.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.username) {
            errors.push('El campo username es requerido');
        }
        if (!req.body.password) {
            errors.push('El campo password es requerido');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Los campos username y password son requeridos'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    UsuarioModel.findByUsername(req.body.username)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user[0]._id,
                        findByUsername: user[0].username,
                        name: user[0].nombre + ' ' + user[0].apellido,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['username o password Invalidos ']});
                }
            }
        });
};