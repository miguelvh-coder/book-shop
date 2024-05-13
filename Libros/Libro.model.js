const mongoose = require("mongoose");

const schemaProducto = new mongoose.Schema({
    Dueño: {type: mongoose.Types.ObjectId, ref: "User"},
    idLibro: {type: Number, required: true},
    nombre: {type: String, required: true},
    genero: {type: String, required: true},
    descripción: {type: String, required: true},
    autor: {type: String, required: true},
    isDeleted: {type: Boolean, required: true, default: false,}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Libro', schemaProducto);

module.exports = Model;