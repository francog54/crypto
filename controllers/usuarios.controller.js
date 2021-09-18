const UsuarioModel = require('../models/usuarios.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    //req.body.permissionLevel = 1;
    UsuarioModel.createUsuario(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        }).catch((err) => {
            res.status(500).send({errors: err});
        })
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UsuarioModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getCriptomonedas = (req, res) => {
    UsuarioModel.getCriptomonedas(req.jwt.userId, req.params.n)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {

    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UsuarioModel.patchUsuario(req.params.usuarioId, req.body)
        .then((result) => {
            res.status(204).send({});
        }).catch((err) => {
            res.status(500).send({errors: err});
        });

};

exports.removeById = (req, res) => {
    UsuarioModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};