const express = require('express')
const router = express.Router();
const { respondWithError } = require('../utils/functions');
const argon2 = require('argon2');

const { readUsuarios, readUsuarioById, createUsuario, updateUsuario, deleteUsuario } = require("./Usuario.controller");
const { userValidations, Deleted } = require('../utils/validations');
const auth = require('../utils/authentication');


//Obtener varios ususarios
async function GetUsuarios(req, res) {
    try {
        // llamada a controlador con los filtros
        Deleted.showDeleted
        validate
        const resultadosBusqueda = await readUsuarios(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: "e" + e})
    }
}//


//Obtener 1 solo ususarios
async function GetOneUsuario(req, res) {
    try {
        userValidations.userId
        Deleted.showDeleted
        validate
        const resultadosBusqueda = await readUsuarioById(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: "e" + e})
    }
}



//crear ususario
async function PostUsuario(req, res) {
    try {
        // llamada a controlador con los datos
        await createUsuario(req.body);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}



async function PatchUsuarios(req, res) {
    try {
        // llamada a controlador con los datos

        userValidations.update;
        validate;

        respondWithError(auth);//En caso de que no se haya autenticado la sesión del usuario
        updateUsuario(req.body);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}//L


async function DeleteUsuarios(req, res) {
    try {
        // llamada a controlador con los datos
        validate;
        respondWithError(auth);//En caso de que no se haya autenticado la sesión del usuario

        const { idUsuario } = req.decodeToken;
        deleteUsuario(idUsuario);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}//L

router.get("/usarios", GetUsuarios); //lista de usuarios
router.get("/usuarios/:IdUsuario", GetOneUsuario); //encontrar un usuario
router.post("/usarios", PostUsuario); //crear ususario
router.patch("/usuarios/:IdUsuario", PatchUsuarios); //atualizar usuario
router.delete("/usuarios/:IdUsuario", DeleteUsuarios); //Borrar usuario


module.exports = router;