const mysql = require("mysql");

const conexao = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Admin1",
    database: "ValorantCampeonato"
})

module.exports = conexao;