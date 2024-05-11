const Usuario = require("./Usuarios.model")


async function findUserbyEmail (email){
    const user = await Usuario.findOne({ email });

    if (user != null) return user;
}

async function findUserbyId (id){
    const user = await Usuario.findOne({ id });

    if (user != null) return user;
}


async function getUsuarioMongo(filtros) {
    const cantidad = await Usuario.countDocuments(filtros);
    const UsuariosFiltrados = await Usuario.find(filtros);

    return {
        resultados: UsuariosFiltrados,
        paginaMax: cantidadUsuarios / 20,
        paginaActual: 1,
        cantidadUsuarios: cantidad
    };
}

async function createUsuarioMongo(datos) {

    const user_c = await findUserbyEmail(userData.email);

    if (user != null){
        throw new AppError(`User with email '${userData.email}' already exists`, status.CONFLICT);
    }
    datos.contraseña = await argon2.hash(datos.contraseña);
    const UsuarioCreado = await Usuario.create(datos);
    
    return UsuarioCreado;
}

async function updateUsuarioMongo(id, cambios) {
    const resultado = await Usuario.findByIdAndUpdate(id, cambios);

    return resultado
}

async function deleteUsuarioMongo(id) {
    const resultado = await Usuario.findByIdAndDelete(id);
    
    return resultado;
}

module.exports = {
    findUserbyEmail,
    findUserbyId,
    createUsuarioMongo,
    getUsuarioMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo
};