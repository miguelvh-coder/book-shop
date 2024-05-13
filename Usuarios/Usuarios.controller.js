const { throwCustomError } = require("../utils/functions");
const { findUserbyEmailMongo, findUserbyIdMongo, createUsuarioMongo, getUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo } = require("./Usuario.actions");
const argon2 = require('argon2');

//leer varios ususarios
async function readUsuarios(query) {

    const { showDeleted } = query;
    const resultadosBusqueda = await getUsuarioMongo(showDeleted);

    return resultadosBusqueda;
}//L


//leer un ususario por id
async function readUsuarioById(query) {

    const { userId } = query;
    const { showDeleted } = query;
    const resultadosBusqueda = await findUserbyIdMongo(userId, showDeleted);

    return resultadosBusqueda;
}//L



async function createUsuario(datos) {
    const { idUsuario, nombre, email, contraseña, edad, direccion, isDeleted } = datos;

    if (nombre == null || contraseña == null || email == null || idUsuario == null || direccion == null) {
        throwCustomError(501, "Ausencia de alguno de los datos requeridos");
    }

    if (edad <= 0) {
        throwCustomError(501, "edad invalida");
    }

    // hacer llamado a base de datos con el filtro de tipo
    const UsuarioCreado = await createUsuarioMongo(datos);

    return UsuarioCreado;
}//L


function updateUsuario(datos) {

    const { idUsuario, ...cambios } = datos;
    const UsuarioActualizado = updateUsuarioMongo(idUsuario, cambios);

    return UsuarioActualizado;
}//L

function deleteUsuario(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const UsuarioBorrador = deleteUsuarioMongo(id);

    return UsuarioBorrador;
}//L

module.exports = {
    readUsuarios,
    readUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
}