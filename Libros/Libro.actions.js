const Libro = require("./Libro.model")

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
    createLibroMongo,
    getLibroMongo,
    updateLibroMongo,
    deleteLibroMongo
};