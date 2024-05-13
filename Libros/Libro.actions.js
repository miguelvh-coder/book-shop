const Libro = require("./Libro.model")
const { respondWithError } = require("../utils/functions");

const findUserbyIdMongo = require('../Usuarios/Usuarios.actions');


//buscar libro por id
async function findLibroByIdMongo (id){
    const book = await Libro.findOne({ id });
    if (book != null) {return book;}
}//L


//crear libro
async function createLibroMongo(idUsusario , datos) {
    const Dueño = await findUserbyIdMongo(idUsusario);
    const LibroCreado = await Libro.create(Dueño, ...datos);
    
    return LibroCreado;
}//L


//Libros y filtros
async function getLibrosMongo(query) {

    const { nombre, id, genero, descripción, precio, autor } = query;
    const filter = {};

    if (!showDeleted) {filter.isDeleted = false;}

    if (nombre) filter.nombre = { $regex: new RegExp(nombre, "i") };
    if (genero) filter.genero = { $regex: new RegExp(genero, "i") };
    if (autor) filter.autor = { $regex: new RegExp(autor, "i") };

    const libros = await Libro.find(filter);

    return libros;
}//L



//busca un libro, verifica permisos y lo modifica
async function updateLibroMongo(bookId, userId, cambios) {
    
    const book = await findLibroByIdMongo(bookId);
    const user = await findUserbyId(userId);

    if (book == null && book?.isDeleted == false){
        throw new respondWithError(`El libro solicitado no existe`, status.NOT_FOUND);
    }

    if (user == null && user?.isDeleted == false){
        throw new respondWithError(`El usuarios actual no existe`, status.NOT_FOUND);
    }

    if (!user.idUsuario.equals(book.user)){
        throw new respondWithError(`No posee permisos de modificación sobre el libro seleccionado`, status.FORBIDDEN);
    }

    return await findByIdAndUpdate(bookId, cambios);

}//L


//misma validaciones que en el update
async function deleteLibroMongo(id) {

    const book = await findLibroByIdMongo(bookId);
    const user = await findUserbyId(userId);

    if (book == null && book?.isDeleted == false){
        throw new AppError(`El libro solicitado no existe`, status.NOT_FOUND);
    }

    if (user == null && user?.isDeleted == false){
        throw new AppError(`El usuarios actual no existe`, status.NOT_FOUND);
    }

    if (!user.idUsuario.equals(book.user)){
        throw new AppError(`No posee permisos de modificación sobre el libro seleccionado`, status.FORBIDDEN);
    }

    const resultado = await Libro.findByIdAndUpdate(id, { "isDeleted": true });
    
    return resultado;
}

module.exports = {
    findLibroByIdMongo,
    createLibroMongo,
    getLibrosMongo,
    updateLibroMongo,
    deleteLibroMongo
};