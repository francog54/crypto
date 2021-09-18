const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const criptomonedaSchema = new Schema({
    simbolo: {
        type:String,
        required: true,
    },
    precioPeso: {
        type:String,
        required: true,
    },
    precioDolar: {
        type:String,
        required: true,
    },
    precioEuro: {
        type:String,
        required: true,
    },
    nombre: {
        type:String,
        required: true,
    },
    imagen: {
        type:String,
        required: true,
    },
    fecha:  {
        type:Date,
        required: true,
    },
});

criptomonedaSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
criptomonedaSchema.set('toJSON', {
    virtuals: true
});

criptomonedaSchema.findById = function (cb) {
    return this.model('Criptomonedas').find({id: this.id}, cb);
};

const Criptomoneda = mongoose.model('Criptomonedas', criptomonedaSchema);


exports.findByCriptomonedaname = (nombre) => {
    return Criptomoneda.find({nombre: nombre});
};
exports.findById = (id) => {
    return Criptomoneda.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createCriptomoneda = (criptomonedaData) => {
    const criptomoneda = new Criptomoneda(criptomonedaData);
    return criptomoneda.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Criptomoneda.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, criptomonedas) {
                if (err) {
                    reject(err);
                } else {
                    resolve(criptomonedas);
                }
            })
    });
};

exports.patchCriptomoneda = (id, userData) => {
    return Criptomoneda.findOneAndUpdate({
        _id: id
    }, criptomonedaData);
};

exports.removeById = (criptomonedaId) => {
    return new Promise((resolve, reject) => {
        Criptomoneda.deleteMany({_id: criptomonedaId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

