const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const conexao = require("./infraestrutura/conexao");
const tabelas = require("./infraestrutura/tabelas");
const consign = require("consign");
const cookieParser = require("cookie-parser");


const port = process.env.PORT || 5000;
var path = require("path");
const { extend } = require("got");
const { config } = require("process");
const { Router } = require("express");
const app = express();

app.use(session({
    secret: 'config.session.secret',
    saveUninitialized: true,
    resave : true
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);
app.use(Router());
app.set("view engine","html","css");

app.use("/public", express.static(path.join(__dirname,"public")));
app.set('views', path.join(__dirname,'/views'));


conexao.connect(function(erro){
    if(erro){
        console.log(erro)
    }else{

        console.log("conectado com sucesso no banco de dados!");
        tabelas.init(conexao);

        consign() //aqui, tudo que tiver no modulo controle vai passar para o app, para ele começar a executar o que tem lá 
        .include("controles")
        .include("routers")
        .into(app)
        

        app.listen(port,(erro) => {
            if(erro){
                console.log(erro);
            }else{
                console.log("Meu servidor rodando");
            }
        })

    }
})



