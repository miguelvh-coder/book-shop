const { throwCustomError } = require("../utils/functions");
const { findUserbyEmail, findUserbyId,createUsuarioMongo, getUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo } = require("./Usuario.actions");
const argon2 = require('argon2');


async function readUsuarioConFiltros(query) {
    const { nombre, contraseña, id, email, edad, direccion } = query;

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getUsuarioMongo(query);

    return resultadosBusqueda;
}

async function createUsuario(datos) {
    const { nombre, contraseña, id, email, edad, direccion } = datos;

    if (nombre == null || contraseña == null || email == null || id == null || direccion == null) {
        throwCustomError(501, "Ausencia de alguno de los datos requeridos");
    }

    if (edad <= 0) {
        throwCustomError(501, "edad invalida");
    }

    const UsuarioSimilar = await getUsuarioMongo({tipo});

    // hacer llamado a base de datos con el filtro de tipo
    const UsuarioCreado = await createUsuarioMongo(datos);

    return LibroUsuario;
}


function updateUsuario(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const UsuarioModficado = updateUsuarioMongo(_id, cambios);

    return UsuarioModficado;
}

function deleteUsuario(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const UsuarioBorrador = deleteUsuarioMongo(id);

    return UsuarioBorrador;
}

module.exports = {
    readUsuarioConFiltros,
    createUsuario,
    updateUsuario,
    deleteUsuario
}