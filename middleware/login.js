const jsonWebToken = require("jsonwebtoken");

exports.obrigatorio = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = jsonWebToken.verify(token,"deusecontigo1");
        console.log(decode);
        req.body.usuario = decode;
        next();
    }
    catch(error){
        return res.status(401).send({mensagem: "Falha na autenticação."})
    }
    
}