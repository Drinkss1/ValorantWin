const conexao = require("../infraestrutura/conexao");
const moment = require("moment");

class CampeonatoBD{  
    adicionar(campeonato, res){
        const dataCriacao = moment().format("YYYY-MM-DD");
        const dataFimInscricao = moment(campeonato.dataFimInscricao).format("YYYY-MM-DD");//aqui estou formatando a data que o usuario mandou
        const dataCampeonato = moment(campeonato.dataCampeonato).format("YYYY-MM-DD");//aqui estou formatando a data que o usuario mandou
        const dataCampeonatoEhValida = dataCampeonato.valueOf() > dataFimInscricao.valueOf();

        var organizacaoEhValido = true;

        if(campeonato.nome.length < 5){
            organizacaoEhValido = false;
        }

        const validacoes = [
            {
                nome: "Data campeonato",
                valido: dataCampeonatoEhValida,
                mensagem: "Data do campeonato não pode ser menor ou igual a data Fim Inscrição."
            },
            {
                nome: "Organização",
                valido: organizacaoEhValido,
                mensagem: "Organização deve ter pelo menos 5 caracteres."
            }

        ]

        const erros = validacoes.filter(campo => !campo.valido);//aqui ele retornar os erros
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros)
        }else{

            if(campeonato.radioValor == 'gratis'){campeonato.valor = 0};
            if(campeonato.radioRequisitos == "radioSemRequisitos"){campeonato.requisitos = "N/D"}

            //Convertendo os valores para as variaveis
            const organizacao = campeonato.nome;
            const valorCamp = parseFloat(campeonato.valor);
            const qtdeEquipes = parseInt(campeonato.qtdeEquipes);
            const requisitos = campeonato.requisitos;
            const UrlSiteInscricao = campeonato.siteInscricao;
            const premiacoes = campeonato.premiacao;

  
            const sql = "INSERT INTO Campeonatos (organizacao,valor,QtdeEquipes,Requisitos,UrlSiteInscricao,DataFimInscricao,DataCriacao,DataCampeonato,Premiacoes) VALUES (?,?,?,?,?,?,?,?,?)";
            const campeonatoDatado = [organizacao,valorCamp,qtdeEquipes,requisitos, UrlSiteInscricao, dataFimInscricao,dataCriacao, dataCampeonato, premiacoes];

            conexao.query(sql, campeonatoDatado, function(erro, resultados){
                if(erro){
                    res.status(400).json("Ocorreu um erro inesperado. Dados do erro: " + erro);
                }
                else{
                    res.status(201).json(resultados);
                }
            })
        }
    }

    buscaLogin(req, res){
        const sql = `SELECT COUNT(*) AS count FROM Login WHERE Usuario = "${req.usuario}" and senha = "${req.senha}"`
        conexao.query(sql, function(erro, resultados, campos){
        console.log(resultados[0].count);
 
            if(erro){
                res.status(400).json(erro, resultados);
            }else{
                /*if(resultados[0].count == 0){
                    return res.redirect("/api/users/logar")
                }else{
                    return res.redirect("/home")
                }*/
                return res.status(200).json(resultados);
            }
        })
    }

    insertLogin(dadosUsuario, res){
        const sql = "INSERT INTO Login (email, Usuario, Senha) values (?,?,?)"
        const valores = [dadosUsuario.email, dadosUsuario.login, dadosUsuario.senha];

        conexao.query(sql,valores, function(erro, resultado){
            if(erro){
                res.status(400).json(erro, resultado);
            }else{
                return res.redirect("/home");
            }
        })
    }

    lista(res){
        const sql = "SELECT * FROM Atendimentos"
        conexao.query(sql, function(erro, resultados){
            if(erro){
                res.status(400).json(erro, resultados);
            }else{
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res){

        const sql = `SELECT * FROM Atendimentos A WHERE A.ID = ${id} `
        conexao.query(sql, function(erro, resultados){
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(atendimento);
            }
        })
    }

    Altera(id, valores , res){

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format("YYYY-MM-DD HH:MM:SS");//aqui estou formatando a data que o usuario mandou
        }
        
        const sql = "UPDATE Atendimentos SET ?  WHERE id = ?"
        conexao.query(sql,[valores, id], function(erro, resultados){
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...valores,id});
            }
        })
    }

    Deleta(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`
        
        conexao.query(sql, function(erro, resultados){
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        })
    }

    BuscaCampeonatos(res){
        const sql = `SELECT * FROM CAMPEONATOS C WHERE C.DataCampeonato >= sysdate()`

        conexao.query(sql, function(erro, resultados){
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }


}

module.exports = new CampeonatoBD