const config = require("../config");
const { ValidateSession } = require("../models/session");
const { getUsers } = require("../models/user");

const AuthMiddleware = async (req, res, next) => {
    const sessionKey = req.headers[config.HEADER_AUTH];
    const session = await ValidateSession(sessionKey);
    if(!session) {
        res.status(401).json({error: 'Unauthorized: Missing Authorization header'});
        return;
    }
    else 
        req.user = (await getUsers({'Korisnik.id': session.korisnik_id}))[0]; 

    next();
};

const AdminMiddleware = async (req, res, next) => {
    console.log(req.user)
    if(req.user.role !== 'Admin') throw "No permission";
    next();
}

module.exports = {
    AuthMiddleware,
    AdminMiddleware
};