const { param, body, checkExact } = require("express-validator");


const authValidations = {
    //registro
    "register": [
        body("name")
            .isString().optional({ nullable: true }),
        body("email")
            .exists().withMessage("Email is required")
            .isEmail().withMessage("Provide valid email"),
        body("password")
            .exists().withMessage("Password is required")
            .isString().withMessage("Password should be string")
            .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
        checkExact([], { message: 'Too many fields specified' })
    ],

    //login
    "login": [
        body("email")
            .exists().withMessage("Email is required")
            .isEmail().withMessage("Provide valid email"),
        body("password")
            .exists().withMessage("Password is required")
            .isString().withMessage("Password should be string")
            .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
        checkExact([], { message: 'Too many fields specified' })
    ]
}


//validaciones para el ususario
const userValidations = {
    "userId": [
        param("idUsuario").isMongoId().withMessage("La idUsuario no es valida")
    ],

    "update": [
        body("nombre")
            .isString().optional({ nullable: true }),
        body("email")
            .optional({ nullable: true })
            .isEmail().withMessage("Ingrese una direccion de email valida"),
        body("contraseña")
            .optional({ nullable: true })
            .isString().withMessage("La contraseña debe ser de tipo Sting")
            .isLength({ min: 7 }).withMessage("La contraseña debe contener al menos 7 caracteres"),
        checkExact([], { message: 'Demasiados campos epecificados' })
    ]
};


//validaciones para
const bookValidations = {
    "bookId": [
        param("idLibro")
            .isMongoId()
            .withMessage("idLibro invalida")
    ],

    "findBook": [
        query("nombre")
            .isString().optional({ nullable: true }),
        query("genero")
            .isString().optional({ nullable: true }),
        query("descripcion")
            .isString().optional({ nullable: true }),
        query("autor")
            .isString().optional({ nullable: true }),
        checkExact([], { message: 'Demasiados campos epecificados' })
    ],

    "createBook": [
        body("nombre")
            .isString()
            .exists().withMessage("Nombre del libro requerido"),
        body("genero")
            .isString()
            .exists().withMessage("Genero del libro requerido"),
        body("descripcion")
            .isString()
            .exists().withMessage("Descripcion del libro requerida"),
        body("autor")
            .isString()
            .exists().withMessage("autor requiredo"),
        checkExact([], { message: 'Demasiados campos epecificados' })
    ],

    "updateBook": [
        body("nombre")
            .isString()
            .optional({ nullable: true }),
        body("genero")
            .isString()
            .optional({ nullable: true }),
        body("descripcion")
            .isString()
            .optional({ nullable: true }),
        body("autor")
            .isString()
            .optional({ nullable: true }),
        checkExact([], { message: 'Demasiados campos epecificados' })
    ]
}


const orderValidation = {
    "createOrder": [
        body("Libros")
            .exists().withMessage("Lista de libros requerida")
            .isArray({ min: 1 }).withMessage("La lista debe contener al menos 1 elemento"),
        body("Libros.*")
            .isMongoId().withMessage("Todos los elementos deben ser ids.")
    ]
}



const Deleted = {
    "showDeleted": [
        query("showDeleted").default(false).toBoolean()
    ]
}


module.exports = {
    authValidations,
    userValidations,
    bookValidations,
    orderValidation,
    Deleted
}