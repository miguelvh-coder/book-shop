const { throwCustomError } = require("../utils/functions");
const { findLibroByIdMongo, createLibroMongo, getLibrosMongo, updateLibroMongo, deleteLibroMongo } = require("./Libro.actions");


async function findLibrobyId (id){

    const book = await findLibroByIdMongo(id);
    return book;
}//L


async function readLibroConFiltros(query) {

    const libros = await getLibrosMongo(query);
    return resultadosBusqueda;
}

async function createLibro(datos) {
    const { nombre, id, genero, descripción, precio, autor } = datos;

    if (id == null || stock == null || autor == null || precio == null) {
        throwCustomError(501, "Ausencia de alguno de los datos requeridos");
    }

    const { userId } = req.decodeToken;

    const book = await bookService.createBook(userId, req.body);
    // hacer llamado a base de datos con el filtro de tipo
    const LibroCreado = await createLibroMongo(datos);

    return LibroCreado;
}


function updateLibro(datos) {
    const { idUsuario } = datos.decodeToken;
    const { idLibro } = datos.params;
    const { ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const LibroModficado = updateLibroMongo(idUsuario, idLibro, cambios);

    return LibroModficado;
}

function deleteLibro(datos) {
    // hacer llamado a base de datos con el filtro de tipo
    const { idUsuario } = datos.decodeToken;
    const { idLibro } = datos.params;
    const LibroBorrador = deleteLibroMongo(idUsuario, idLibro);

    return LibroBorrador;
}

module.exports = {
    findLibrobyId,
    readLibroConFiltros,
    createLibro,
    updateLibro,
    deleteLibro
}