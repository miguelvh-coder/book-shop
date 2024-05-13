const { throwCustomError } = require("../utils/functions");
const { readPedidosMongo, readPedidoIdMongo, createPedidoMongo, updatePedidoMongo } = require("./Pedido.actions");

async function readPedidos(query) {

    const { estado, libros, precio } = query;

    const { userId } = req.decodeToken;

    const resultadosBusqueda = await readPedidosMongo( userId, estado, libros, precio );

    return resultadosBusqueda;
}



async function readPedidoById(query) {
    
    const { idUsuario } = query.decodeToken;
    const { idPedido } = req.params;

    const resultadosBusqueda = await readPedidoIdMongo(idUsuario, idPedido);

    return resultadosBusqueda;
}



async function createPedido(req) {

    const { idUsuario } = req.decodeToken;
    const { Libros: idLibro } = req.body;

    const PedidoCreado = await createPedidoMongo(idUsuario, idLibro);

    return PedidoCreado;
}


function updatePedido(datos) {

    const { idUsuario } = datos.decodeToken;
    const { idPedido } = datos.params;
    const { Estado: estado } = datos.body;

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoModficado = updatePedidoMongo(idUsuario, idPedido, estado);

    return PedidoModficado;
}


module.exports = {
    readPedidos,
    readPedidoById,
    createPedido,
    updatePedido,
}