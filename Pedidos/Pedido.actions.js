const Pedido = require("./Pedido.model")

async function getPedidoMongo(filtros) {
    const cantidad = await Pedido.countDocuments(filtros);
    const PedidosFiltrados = await Pedido.find(filtros);

    return {
        resultados: PedidosFiltrados,
        //paginaMax: cantidadProductos / 20,
        //paginaActual: 1,
        cantidadPedidos: cantidad
    };
}

async function createPedidoMongo(datos) {
    const PedidoCreado = await Pedido.create(datos);
    
    return PedidoCreado;
}

async function updatePedidoMongo(id, cambios) {
    const resultado = await Pedido.findByIdAndUpdate(id, cambios);

    return resultado
}

async function deletePedidoMongo(id) {
    const resultado = await Pedido.findByIdAndDelete(id);
    
    return resultado;
}

module.exports = {
    createPedidoMongo,
    getPedidoMongo,
    updatePedidoMongo,
    deletePedidoMongo
};