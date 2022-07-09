const CampeonatosBD = require("../models/CampeonatosBD");
const logar = require("../controles/logar")


module.exports = app => { 
    
    app.post("/cadastro", (req, res) =>{
        
        console.log(req.body);
        CampeonatosBD.insertLogin(req.body,res);
    })

    app.get("/cadastro", (req,res) =>{
        res.render("formCadastro");
    })

    app.get("/home", (req,res) =>{
        res.render("homeValorant");
    })

    app.post("/api/users/logar",logar.Logar);
    
    app.get("/login", (req,res) =>{
        res.render("index");
    })
}