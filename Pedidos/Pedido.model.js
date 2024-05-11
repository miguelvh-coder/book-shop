const mongoose = require("mongoose");

const schemaProducto = new mongoose.Schema({
    id: {type: Number, required: true},
    item: {type: String, required: true},
    precio: {type: Number, required: true},
    id_vendedor: {type: Number, required: true},
    id_comprador: {type: Number, required: true},
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Pedido', schemaProducto);

module.exports = Model;