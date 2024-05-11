const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasLibro = require("./Libro/Libro.route")
const rutasUsuario = require("./Usuarios/Usuario.route")
const rutasPedido = require("./Pedidos/Pedido.route")


app.use('/libro', rutasLibro);
app.use('/ususario', rutasUsuario);
app.use('/pedido', rutasPedido);


// aqui va la connection string VVVVV
mongoose.connect('mongodb://127.0.0.1:27017/myapp');


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
app.listen(8080);

