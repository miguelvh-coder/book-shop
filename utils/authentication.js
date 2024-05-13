const status = require('http-status');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;


//Verificación de que un usuaroio este logeado
const auth = async (req, res, next) => {
    const authHeader = req.headers['autorizacion'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {return res.sendStatus(status.UNAUTHORIZED);} //Se niega el acceso en caso de que no este logeado el usuario

    jwt.verify(token, SECRET, (err, decodeToken) => {

        if (err) return res.sendStatus(status.FORBIDDEN);
        req.decodeToken = decodeToken;

        next(); //Continua la accion del usuario registrado
    });
}

module.exports = auth;