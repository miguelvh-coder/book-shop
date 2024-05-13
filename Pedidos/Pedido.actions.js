const Pedido = require("./Pedido.model");

const findUserbyIdMongo = require('../Usuarios/Usuarios.actions');
const findLibroByIdMongo = require('../Libros/Libro.actions');

async function readPedidosMongo(idUsuario, Estado, libros, precio) {

    const user = await findUserbyIdMongo(idUsuario);

    if (user == null){throw new respondWithError(`El usuario actual es inexistente`, status.NOT_FOUND);}

    const filter = {};

    if (Estado) {filter.estado = Estado;}

    return await Pedido.find(filter);
}


async function readPedidoIdMongo(idUsuario, idPedido) {

    const user = await findUserbyIdMongo(idUsuario);

    if (user == null){ throw new respondWithError(`El usuario actual es inexistente`, status.NOT_FOUND);}

    const pedido = await Pedido.findById(idPedido);

    if (pedido == null){throw new respondWithError(`Pedido no encontrado`, status.NOT_FOUND);}
    if (!(user.equals(Pedido.Vendedor) || user.equals(Pedido.Comprador))){throw new respondWithError(`Acceso no autorizado`, status.FORBIDDEN);}

    return pedido;
}



async function createPedidoMongo(idUsuario, idLibro) {

    const comprador = await findUserbyIdMongo(idUsuario);
    const libros = [];

    for (let id of idLibro) {
        const lib = await findLibroByIdMongo(id);

        if (lib == null) {throw new respondWithError(`Libro con id no encontrada`, status.NOT_FOUND);}

        if (vendedor == null) {
            vendedor = await findLibroByIdMongo(lib.Dueño);
            if (vendedor == null) {
                throw new respondWithError(`Vendedor no encontrado`, status.NOT_FOUND);
            }
        }

        libros.push(lib);
    }

    return await Pedido.create({ comprador, vendedor, libros });
}

async function updatePedidoMongo(idUsuario, idPedido, Estado) {

    const usuario = await findLibroByIdMongo(idUsuario);
    const pedido = await Pedido.findById(idPedido);

    if (usuario == null) { throw new respondWithError(`El usuario actual es inexistente`, status.NOT_FOUND);}

    if (pedido == null) { throw new AppError(`El pedido actual es inexistente`, status.NOT_FOUND);}

    if (pedido.estado == "COMPLETED" || pedido.estado == "CANCELED"){throw new AppError(`La orden actual ya ha sido finalizada`, status.NOT_FOUND);}

    const resultado = await Pedido.findByIdAndUpdate(idPedido, { estado: Estado });

    return resultado
}


module.exports = {
    readPedidosMongo,
    readPedidoIdMongo,
    createPedidoMongo,
    updatePedidoMongo
};