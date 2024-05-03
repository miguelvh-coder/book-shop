const { throwCustomError } = require("../utils/functions");
const { createLibroMongo, getLibroMongo, updateLibroMongo, deleteLibroMongo } = require("./Libro.actions");

async function readLibroConFiltros(query) {
    const { nombre, id, tipo, descripción, precio, autor, idAutor } = query;

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getLibroMongo(query);

    return resultadosBusqueda;
}

async function createLibro(datos) {
    const { nombre, id, tipo, descripción, precio, autor, idAutor } = datos;

    if (id == null || idAutor == null || autor == null || precio == null) {
        throwCustomError(501, "Ausencia de alguno de los datos requeridos");
    }

    const LibroSimilar = await getLibroMongo({tipo});

    // hacer llamado a base de datos con el filtro de tipo
    const LibroCreado = await createLibroMongo(datos);

    return LibroCreado;
}


function updateProducto(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const productoCreado = updateProductoMongo(_id, cambios);

    return productoCreado;
}

function deleteProducto(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const productoCreado = deleteProductoMongo(id);

    return productoCreado;
}

module.exports = {
    readProductoConFiltros,
    createProducto,
    updateProducto,
    deleteProducto
}