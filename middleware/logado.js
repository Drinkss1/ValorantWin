const jsonWebToken = require("jsonwebtoken");

exports.verifyLogin = (req, res, next) =>{
   
    try{
        
        Auth = req.cookies.Token || null;
        
        if(typeof(Auth) == "undefined" || Auth == "" || Auth == null){
            return res.status(401).send({mensagem: "Falha na autenticação.\nEntre novamente em sua conta!"})
        }

        var Token = jsonWebToken.verify(Auth,"deusecontigo1");
        console.log(Token);
        next();
    }
    catch(error){
        return res.status(401).send({mensagem: "Falha na autenticação.\nEntre novamente em sua conta!"})
    }
    
}