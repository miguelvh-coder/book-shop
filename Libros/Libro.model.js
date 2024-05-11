const mongoose = require("mongoose");

const schemaProducto = new mongoose.Schema({
    nombre: {type: String, required: true},
    id: {type: Number, required: true},
    tipo: {type: String, required: true},
    descripción: {type: String, required: true},
    precio: {type: Number, required: true},
    autor: {type: String, required: true},
    stock: {type: Number, required: true},
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Libro', schemaProducto);

module.exports = Model;