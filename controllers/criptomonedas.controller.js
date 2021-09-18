const CriptomonedaModel = require('../models/criptomonedas.model');

exports.insert = (req, res) => {
    CriptomonedaModel.createCriptomoneda(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
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
    CriptomonedaModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    CriptomonedaModel.findById(req.params.criptomonedaId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
 

    CriptomonedaModel.patchUsuario(req.params.criptomonedaId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    CriptomonedaModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};