var formulario = document.querySelector("#formCadastro");
var btnBuscarCep = document.querySelector("#btnBuscarCep");


btnBuscarCep.addEventListener("click",function(){
    var cep = document.querySelector("#cep");
    var cidade = document.querySelector("#cidade");
    var logradouro = document.querySelector("#endereco");

    fetch("https://viacep.com.br/ws/"+cep.value+"/json/")
        .then(response => {
            console.log(response.status);
            return response.json();
        })
        .then(users => 
            {
                cidade.value = users.localidade,
                logradouro.value = users.logradouro
            }
        )
        .catch(error => 
            console.log("Falhou",error)
        )
})

formulario.addEventListener("submit",function(event){
    var erro = document.querySelector("#alertaErroValidForm");
    var email = document.querySelector("#email");
    var login = document.querySelector("#login");
    var senha = document.querySelector("#senha");
    var mostrarErro = document.querySelector("#mostraErro");

    erro.classList.add("d-none");

    email.classList.remove("is-invalid");
    login.classList.remove("is-invalid");
    senha.classList.remove("is-invalid");

    if (!email.value){
        erro.classList.remove("d-none");
        mostrarErro.textContent = "Preencha o campo E-mail.";
        email.focus();
        email.classList.add("is-invalid");
        event.preventDefault();
    }
    else if(!login.value){
        erro.classList.remove("d-none");
        mostrarErro.textContent = "Preencha o campo Login.";
        login.focus();
        login.classList.add("is-invalid");
        event.preventDefault();
    }
    else if (!senha.value){
        erro.classList.remove("d-none");
        mostrarErro.textContent = "Preencha o campo Senha.";
        senha.focus();
        senha.classList.add("is-invalid");
        event.preventDefault();
    }
    
    return true;
});
