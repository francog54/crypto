const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {
        type:String,
        required: true,
    },
    apellido: {
        type:String,
        required: true,
    },
    username: {
        type: String, required: true, index: true, unique: true
    },
    password: {
        type:String,
        required: true,
        min:8
    },
    monedaPreferida:  {
        type:String,
        required: true,
        enum: ['Euro', 'Dólar', 'Peso'],
    },
    criptomonedas:{
        type: Schema.Types.Mixed,
        ref:'Criptomonedas',
     
    },
});

usuarioSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
usuarioSchema.set('toJSON', {
    virtuals: true
});

usuarioSchema.findById = function (cb) {
    return this.model('Usuarios').find({id: this.id}, cb);
};

const Usuario = mongoose.model('Usuarios', usuarioSchema);
Usuario.createIndexes();

exports.findByUsername = (username) => {
    return Usuario.find({username: username});
};
exports.getCriptomonedas = (id, n) => {
    let _id = mongoose.Types.ObjectId(id);
    let limit = Number(n)
    if(limit >= 25){
        limit = 24
    }

    return Usuario.aggregate([
        { $match:{ '_id':_id } }, 
        { $unwind: "$criptomonedas" },
        { $sort: { "criptomonedas.precio": -1 } },
        { $limit : limit },
        { $group: { _id: "$_id", criptomonedas: { $push: "$criptomonedas" } } },
  
        ])
        .then((result) => {
           

            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createUsuario = (usuarioData) => {
    const usuario = new Usuario(usuarioData);
    return usuario.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Usuario.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, usuarios) {
                if (err) {
                    reject(err);
                } else {
                    resolve(usuarios);
                }
            })
    });
};

exports.patchUsuario = (id, usuarioData) => {
    return Usuario.findOneAndUpdate({
        _id: id
    }, usuarioData);
};

exports.removeById = (usuarioId) => {
    return new Promise((resolve, reject) => {
        Usuario.deleteMany({_id: usuarioId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

