const mongoose = require("mongoose");

const schemaProducto = new mongoose.Schema({
    id: {type: Number, required: true},
    Vendedor: {type: mongoose.Types.ObjectId, ref: "User"},
    comprador: {type: mongoose.Types.ObjectId, ref: "User"},
    stado: {
      type: String,enum: ['IN PROGRESS', 'CANCELED', 'COMPLETED'],default: 'IN PROGRESS'
    },
    books: [{type: mongoose.Types.ObjectId, ref: "Book" }],
    precio: {type: Number, required: true},
  }, 
  {
    versionKey: false,
    timestamps: true
  });
  
const Model = mongoose.model('Pedido', schemaProducto);

module.exports = Model;