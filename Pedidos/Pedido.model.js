const mongoose = require("mongoose");

const schemaProducto = new mongoose.Schema({
    idPedido: {type: Number, required: true},
    Vendedor: {type: mongoose.Types.ObjectId, ref: "User"},
    comprador: {type: mongoose.Types.ObjectId, ref: "User"},
    estado: {
      type: String,enum: ['IN PROGRESS', 'CANCELED', 'COMPLETED'],default: 'IN PROGRESS'
    },
    libros: [{type: mongoose.Types.ObjectId, ref: "Libro" }],
    precio: {type: Number, required: true},
  }, 
  {
    versionKey: false,
    timestamps: true
  });
  
const Model = mongoose.model('Pedido', schemaProducto);

module.exports = Model;