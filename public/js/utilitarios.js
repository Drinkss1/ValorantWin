export default class Utilitarios {

    apresentar() {
        console.log(`Olá, meu nome é ${this.nome}`);
    }

    exibeMensagensDeErro(erros){
        var ul = document.querySelector("#mensagensErro");
        ul.innerHTML = "";
    
        erros.forEach((erro) => {
            var li = document.createElement("li");
            li.setAttribute('id', 'mensagensErrosLi');
            li.textContent = erro;
            ul.appendChild(li);
            li.classList.add("mensagensErro");
        });
    }

}