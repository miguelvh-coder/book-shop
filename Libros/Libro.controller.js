const { throwCustomError } = require("../utils/functions");
const { createLibroMongo, getLibroMongo, updateLibroMongo, deleteLibroMongo } = require("./Libro.actions");

async function readLibroConFiltros(query) {
    const { nombre, id, tipo, descripción, precio, autor, idAutor } = query;

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getLibroMongo(query);

    return resultadosBusqueda;
}

async function createLibro(datos) {
    const { nombre, id, tipo, descripción, precio, autor, stock } = datos;

    if (id == null || stock == null || autor == null || precio == null) {
        throwCustomError(501, "Ausencia de alguno de los datos requeridos");
    }

    const LibroSimilar = await getLibroMongo({tipo});

    // hacer llamado a base de datos con el filtro de tipo
    const LibroCreado = await createLibroMongo(datos);

    return LibroCreado;
}


function updateLibro(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const LibroModficado = updateLibroMongo(_id, cambios);

    return LibroModficado;
}

function deleteLibro(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const LibroBorrador = deleteLibroMongo(id);

    return LibroBorrador;
}

module.exports = {
    readLibroConFiltros,
    createLibro,
    updateLibro,
    deleteLibro
}