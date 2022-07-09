const CampeonatosBD = require("../models/CampeonatosBD");
const login = require("../middleware/login");
const logado = require("../middleware/logado")

module.exports = app => { 

    app.get("/campeonatos",(req,res) =>{
        res.render("campeonatos");
    })

    app.post("/campeonatos",logado.verifyLogin,(req,res) => {
        const campeonato = req.body; //aqui ele pega o que o usuario mandou 
        console.log(campeonato);
        CampeonatosBD.adicionar(campeonato, res); // e passa para a nossa função de adicionar no banco de dados
    })

    app.get("/buscarCampeonatos",(req,res) =>{
        CampeonatosBD.BuscaCampeonatos(res);
    })
}