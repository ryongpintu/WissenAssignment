const jwt = require('jsonwebtoken');
const keys = require('../config/keys_dev');
module.exports = function (req, res, next) {
    let  token = req.header('Authorization');
    token = token.replace('Bearer',"").trim()
   
    if (!token) res.status(401).send({errors:'Acess denied, No token provided'});

    try {

        const decode = jwt.verify(token, keys.secretOrKey);// if its valid it returns payloadss
        req.user = decode; // you will get the payload that you added in user.js then you can copare the payload in routes
        if(decode.usertype =='admin'){
            next();
        }else{
            res.status(403).send({errors:'Acess denied, unauthorized'});
        }
        
        
    } catch (ex) {
        res.status(400).send({errors:'invalid token'});
    }

}

