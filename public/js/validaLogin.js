//import {exibeMensagensDeErro} from "../js/incluirEventoTabela";
import Utilitarios from "./utilitarios.js";
var btnLogin = document.querySelector("#loginEntrar");

btnLogin.addEventListener("click",function(event){
    //event.preventDefault();
    
    var usuario = document.querySelector("#usuario").value;
    var senha = document.querySelector("#senha").value;

    var errors = [];

    if(usuario == ""){
        errors.push("O campo usuário deve ser preenchido.");
    }


    if(senha == ""){
        errors.push("O campo senha deve ser preenchido.");
    }

    const utilitarios = new Utilitarios();

    if(errors.length > 0){
        utilitarios.exibeMensagensDeErro(errors);
        return;
    }

    var json = 	
    {
        "usuario": usuario,
        "senha": senha

    }
    const data = json;

    var responseOk;
    fetch("http://localhost:5000/api/users/logar", {
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
            if(!responseOk){
                errors.push(data.mensagem);
                return utilitarios.exibeMensagensDeErro(errors);
            }
            window.location.href = "http://localhost:5000/home";
        })
        .catch((error) => {
            console.error("Ocorreu um erro ao executar a requisição: ",error);
        });

})