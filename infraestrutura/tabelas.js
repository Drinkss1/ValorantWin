class Tabelas{
    init(conexao){
        this.conexao = conexao;
        this.criarTableLogin();
    }

    criarTableLogin(){
        const sql = "CREATE TABLE "+ 
                    "IF NOT EXISTS Login (  id int NOT NULL AUTO_INCREMENT,"+
                                                "email varchar(100) NOT NULL,"+
                                                "Usuario varchar(50) NOT NULL,"+
                                                "Senha varchar(50) NOT NULL,"+
                                                "PRIMARY KEY(id))";                                   

        this.conexao.query(sql, function(erro){
            if(erro){
                console.log(erro);
            }else{
                console.log("Tabela Login criado com sucesso!");
            }
        })
    };
}

module.exports = new  Tabelas