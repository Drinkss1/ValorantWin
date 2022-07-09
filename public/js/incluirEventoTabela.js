var botaoBuscarCamp = document.querySelector("#buscarCampeonatos");
var botaoAdicionar = document.querySelector("#adicionarEvento");
import Utilitarios from "./utilitarios.js";

botaoAdicionar.addEventListener("click",function(event){
    event.preventDefault();//previne os Comportamentos padrão do clique do botão sem carregamento de página
    
    var form = document.querySelector("form");//Selecionando o form quando fomos pegar os input só é necessário colocar o name
    if(form.valor.value == "Grátis"){
        form.valor.value = 0;
    }


    var json = 	
    {
        "nome": form.nome.value,
        "valor": form.valor.value,
        "qtdeEquipes": qtdeEquipes.value,
        "requisitos": form.requisitos.value,
        "siteInscricao": form.siteInscricao.value,
        "premiacao": form.premiacao.value,
        "dataFimInscricao": form.dataFimInscricao.value,
        "dataCampeonato": form.dataCampeonato.value
    }
    const data = json;
    var erros = ValidaInscricao(json);

    const utilitarios = new Utilitarios();

    if(erros.length > 0){
        utilitarios.exibeMensagensDeErro(erros);
        return;
    }
    var responseOk;

    fetch("http://localhost:5000/campeonatos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
        .then(function(response){
            responseOk = response.ok;
            return response.json();
        })
        .then((data) => {
            var aviso = [];
            if(!responseOk){
                if(Object.keys(data).length > 1){
                    data.forEach(function(x){
                        aviso.push(x.mensagem);
                    })
                }else{
                    aviso.push(data.mensagem);
                }
                utilitarios.exibeMensagensDeErro(aviso);
                return;
            }

            form.reset();
            var mensagensErro = document.querySelector("#mensagensErro");
            mensagensErro.innerHTML = "";
            var radioValor = document.querySelector("#radioValor");
            var radioRequisitos = document.querySelector("#radioRequisitos");
            radioValor.click();
            radioRequisitos.click();

            aviso.push("Evento enviado com sucesso! Aguarde, iremos analisar e publicar seu evento.");
            utilitarios.exibeMensagensDeErro(aviso);
        })
        .catch((error) => {
            console.error("Ocorreu um erro ao executar a requisição: ",error);
            return;
    });
});


function ValidaInscricao(organizacao){

    var erros = [];

    if(organizacao.nome.length == 0){
        erros.push("O campo 'Organização' não pode ser em branco.");
    }

    if (organizacao.valor == '0' ){
        var radiovalue = document.querySelector("#radioGratis");
        radiovalue.click();
        //organizacao.valor.textContent = 'Grátis';
    };

    if(organizacao.valor.length == 0){
        var nomeCampoVazio = document.createElement("a","Valor");
        nomeCampoVazio.classList.add("nomeCampoVazio");
        erros.push("O campo ' Valor ' não pode ser em branco.");
    }

    if(organizacao.qtdeEquipes.length == 0){
        erros.push("O campo ' Quantidades de Equipes ' não pode ser em branco.");
    }

    if(organizacao.requisitos.length == 0){
        erros.push("O campo ' Requisitos ' não pode ser em branco.");
    }

    if(organizacao.siteInscricao.length == 0){
        erros.push("O campo ' Site para inscrição ' não pode ser em branco.");
    }

    if(organizacao.premiacao.length == 0){
        erros.push("O campo ' Premiações ' não pode ser em branco.");
    }

    if(organizacao.qtdeEquipes % 2 != 0){
        erros.push("Apenas números pares são aceitos para definir as quantidades de equipes.");
    }

    if(organizacao.dataFimInscricao.length == 0){
        erros.push("O campo ' Data fim inscrição ' não pode ser em branco.")
    }

    return erros;
}

window.onload = function exampleFunction(){
    fetch("http://localhost:5000/buscarCampeonatos")
    .then(response => {
        console.log(response.status);
        return response.json();
    })
    .then(users => 
        {
            PopulaTabela(users);
        }
    )
    .catch(error => 
        console.log("Falhou",error)
    )
};


function PopulaTabela(obj){

    obj.forEach(element => {
        AdicionaOrganizacaoNaTabela(element);
    });
    
}

function AdicionaOrganizacaoNaTabela(organizacao){
    var criaTr = MontaTr(organizacao);
    var tabela = document.querySelector("#tabelaOrganizacoes");
    tabela.appendChild(criaTr);
}

function MontaTr(organizacao){

    var organizacaoTr = document.createElement("tr");
    organizacaoTr.classList.add("organizacao");
        
    organizacaoTr.appendChild(MontaTd(organizacao.Organizacao, "info-organizacao"));
    organizacaoTr.appendChild(MontaTd(organizacao.Valor, "info-valor"));
    organizacaoTr.appendChild(MontaTd(organizacao.QtdeEquipes, "info-equipes"));
    organizacaoTr.appendChild(MontaTd(organizacao.Requisitos, "info-requisitos"));
    organizacaoTr.appendChild(MontaTd(organizacao.Premiacoes, "info-premiacao"));
    organizacaoTr.appendChild(criaColunaSite(organizacao),"localInscricao");

    return organizacaoTr;
}

function MontaTd(informacao, classe){
    var td = document.createElement("td");
    td.textContent = informacao;
    td.classList.add(classe);

    return td;
}

function criaColunaSite(infoSite){
    var tagA = document.createElement("a");
    tagA.setAttribute("href", infoSite.UrlSiteInscricao);
    tagA.setAttribute("target","_blank");

    var imgSite = document.createElement("img");
    imgSite.src = "../public/imagens/imgSite.png";

    tagA.appendChild(imgSite);

    var td = document.createElement("td");
    td.classList.add("localInscricao");

    td.appendChild(tagA);

    return td;
}