const mongoose = require("mongoose");
const argon2 = require('argon2');

const schemaUsuarios = new mongoose.Schema({
    idUsuario: {type: Number, required: true},
    nombre: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    contraseña: {type: String, required: true},
    edad: {type: Number, required: true},
    direccion: {type: String, required: true},
    isDeleted: {type: Boolean, required: true, default: false,}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Usuario', schemaProducto);

module.exports = Model;