const Libro = require("./Libro.model")


//buscar libro por id
async function findLibrobyId (id){
    const book = await Libro.findOne({ id });

    if (book != null) return book;
}

async function getLibroMongo(filtros) {
    const cantidad = await Libro.countDocuments(filtros);
    const librosFiltrados = await Libro.find(filtros);

    return {
        resultados: librosFiltrados,
        paginaMax: cantidadProductos / 20,
        paginaActual: 1,
        cantidadProductos: cantidad
    };
}

async function createLibroMongo(datos) {
    const LibroCreado = await Libro.create(datos);
    
    return LibroCreado;
}

async function updateLibroMongo(id, cambios) {
    const resultado = await Libro.findByIdAndUpdate(id, cambios);

    return resultado
}

async function deleteLibroMongo(id) {
    const resultado = await Libro.findByIdAndDelete(id);
    
    return resultado;
}

module.exports = {
    findLibrobyId,
    createLibroMongo,
    getLibroMongo,
    updateLibroMongo,
    deleteLibroMongo
};