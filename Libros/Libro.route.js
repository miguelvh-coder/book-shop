const express = require('express')
const router = express.Router();
const { findLibrobyId, readLibroConFiltros, createLibro, updateLibro, deleteLibro } = require("./Libro.controller");
const { respondWithError } = require('../utils/functions');

const validate = require('../utils/validate');
const { bookValidations, Deleted } = require('../utils/validations');


//buscar varios libros
async function GetLibros(req, res) {
    try {
        // llamada a controlador con los filtros
        Deleted.showDeleted;
        bookValidations.findBook;
        validate;

        const libros = await readLibroConFiltros(req.query);

        if (!libros) {
            res.status(404).json({ error: 'Libros no encontrados' });
        } else {
            res.json(libros);
        }

    } catch(e) {
        res.status(500).json({msg: "e" + e})
    }
}//L


//buscar un solo libro por su id
async function GetLibroById(req, res) {
    try {
        Deleted.showDeleted;
        bookValidations.bookId;
        validate;

        const { idLibro } = req.params;
        const libro = await findLibrobyId(idLibro);

        if (!libro) {
            res.status(404).json({ error: 'Libro no encontrado' });
        } else {
            res.json(libro);
        }

    } catch(e) {
        res.status(500).json({msg: "e" + e})
    }
}//L


//crear libro
async function PostLibro(req, res) {
    try {
        // llamada a controlador con los datos
        bookValidations.createLibro;
        validate;
        respondWithError(auth); //verificar auntenticidad de la sesion del usuario

        const libro = await createLibro(req.body);
        res.status(200).json({
            ...libro
        })
    } catch(e) {
        respondWithError(res, e);
    }
}//L


async function PatchLibros(req, res) {
    try {
        // llamada a controlador con los datos
        bookValidations.bookId;
        bookValidations.updateBook;
        validate;
        respondWithError(auth);

        const libroAct = await updateLibro(req.body);

        res.status(200).json({
            ...libroAct
        })
    } catch(e) {
        respondWithError(res, e);
    }
}//L


async function DeleteLibros(req, res) {
    try {
        // llamada a controlador con los datos
        bookValidations.bookId;
        validate;
        respondWithError(auth);
        
        const libroBorrador =await deleteLibro(req);

        res.status(200).json({
            ...libroBorrador
        })
    } catch(e) {
        respondWithError(res, e);
    }
}//L

router.get("/libros/:idLibro", GetLibroById); //encontrar un libro por id
router.get("/libros", GetLibros); //encontrar varios libros
router.post("/user/:userId", PostLibro); //crear libor
router.patch("/:idLibro", PatchLibros); //actualizar informacion de un libro
router.delete("/:idLibro", DeleteLibros); //actualizar un libro como borrado


module.exports = router;