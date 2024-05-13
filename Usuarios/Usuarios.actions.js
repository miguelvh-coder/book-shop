const Usuario = require("./Usuarios.model")


async function findUserbyEmailMongo (email){
    const user = await Usuario.findOne({ email });

    if (user != null) return user;
}//L

//Encontrar usuario no eliminado por id
async function findUserbyIdMongo (id,  showDeleted = false){
    const user = await Usuario.findOne({ id });

    if (user != null && (showDeleted || !user?.isDeleted)) return user;
}//L


//buscar varios usuarios
async function getUsuarioMongo(showDeleted = false) {
    
    if (showDeleted) {
        return await User.find();
    }else {
        return await User.find({ isDeleted: false });
    }
}//L

async function createUsuarioMongo(userData) {

    const user_c = await findUserbyEmailMongo(userData.email);

    if (user_c != null){
        throw new AppError(`User with email '${userData.email}' already exists`, status.CONFLICT);
    }

    userData.contraseña = await argon2.hash(userData.contraseña);
    const UsuarioCreado = await Usuario.create(userData);
    
    return UsuarioCreado;
} //L



async function updateUsuarioMongo(id, cambios) {
    const Actualizado = await Usuario.findByIdAndUpdate(id, cambios);

    return Actualizado;
}//L

async function deleteUsuarioMongo(id) {
    const resultado = await Usuario.findByIdAndUpdate(userId, { "isDeleted": true });
    
    return resultado;
}//L

module.exports = {
    findUserbyEmailMongo,
    findUserbyIdMongo,
    createUsuarioMongo,
    getUsuarioMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo
};