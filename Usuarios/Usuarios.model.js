const mongoose = require("mongoose");
const argon2 = require('argon2');

const schemaUsuarios = new mongoose.Schema({
    nombre: {type: String, required: true},
    contraseña: {type: String, required: true},
    id: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    edad: {type: Number, required: true},
    direccion: {type: String, required: true}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Usuario', schemaProducto);

module.exports = Model;