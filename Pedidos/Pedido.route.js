const express = require('express')
const router = express.Router();

const { readPedidos, readPedidoById, createPedido, updatePedido } = require("./Pedido.controller");
const { respondWithError } = require('../utils/functions');

const { orderValidations, Deleted } = require('../utils/validations');

async function GetPedidos(req, res) {
    try {
        // llamada a controlador con los filtros
        validate;
        respondWithError(auth)

        const resultadosBusqueda = await readPedidos(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: "e" + e})
    }
}

async function GetPedidoById(req, res) {
    try {
        // llamada a controlador con los datos
        orderValidations.orderId;
        validate;
        respondWithError(auth)

        const resultado = await readPedidoById(req.query);

        res.status(200).json({
            ...resultado
        })
    } catch(e) {
        respondWithError(res, e);
    }
}



async function PostPedido(req, res) {
    try {
        // llamada a controlador con los datos
        orderValidations.createOrder;
        validate;
        respondWithError(auth); //verificar auntenticidad de la sesion del usuario

        const ordenado = await createPedido(req);
        res.status(200).json({
            ...ordenado
        })
    } catch(e) {
        respondWithError(res, e);
    }
}//L



async function PatchPedido(req, res) {
    try {
        // llamada a controlador con los datos
        orderValidations.orderId;
        validate;
        respondWithError(auth);
        const pedidoModificado = await updatePedido(req);

        res.status(200).json({
            ...pedidoModificado
        })
    } catch(e) {
        respondWithError(res, e);
    }
}



router.get("/", GetPedidos);
router.get("/:idPedido", GetPedidoById);
router.post("/", PostPedidos);
router.patch("/:idPedido", PatchPedidos);


module.exports = router;