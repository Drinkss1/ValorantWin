const jsonWebToken = require("jsonwebtoken");
const conexao = require("../infraestrutura/conexao");


exports.Logar = (req,res,next) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    const sql = `SELECT COUNT(*) AS count FROM Login WHERE Usuario = "${usuario}" and senha = "${senha}"`
    conexao.query(sql, function(error, resultado){
        if(error){return res.status(500).send({error: error})}
        
        if(resultado[0].count < 1){
            return res.status(401).send({mensagem: "Usuário ou senha inválido."})
        }
        const token = jsonWebToken.sign({
            usuario: usuario,
            senha: senha
        },
        "deusecontigo1",{
            expiresIn: "3m"
        })

        res.cookie('Token', token);
        return res.status(200).send({
            mensagem: "Atenticado com sucesso.",
            token: token
        })
    })
}