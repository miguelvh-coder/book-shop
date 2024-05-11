const { throwCustomError } = require("../utils/functions");
const { createPedidoMongo, getPedidoMongo, updatePedidoMongo, deletePedidoMongo } = require("./Pedido.actions");

async function readPedidoConFiltros(query) {
    const { id, item, precio, id_vendedor, id_comprador } = query;

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getPedidoMongo(query);

    return resultadosBusqueda;
}

async function createPedido(datos) {
    const { id, item, precio, id_vendedor, id_comprador } = datos;

    if (id == null || id_vendedor == null || id_comprador == null || precio == null || precio == null) {
        throwCustomError(501, "Ausencia de alguno de los datos requeridos");
    }

    if (precio < 0 ) {
        throwCustomError(501, "precio inválido");
    }

    const PedidoSimilar = await getPedidoMongo({tipo});

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoCreado = await createPedidoMongo(datos);

    return PedidoCreado;
}


function updatePedido(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoModficado = updatePedidoMongo(_id, cambios);

    return PedidoModficado;
}

function deletePedido(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoBorrador = deletePedidoMongo(id);

    return PedidoBorrador;
}

module.exports = {
    readPedidoConFiltros,
    createPedido,
    updatePedido,
    deletePedido
}