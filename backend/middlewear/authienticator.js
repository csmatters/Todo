const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
    const token = req.header("Authorization")?.split(' ')[1];

    if(!token){
        return res.status(403).send({error: "Access Denied"});
    }

    try {

        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedToken;
        next();
        
    } catch (err) {
        return res.status(403).send({error: "Invalid Token"});
    }
}

module.exports = authenticator;