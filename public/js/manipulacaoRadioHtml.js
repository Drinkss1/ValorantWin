var radioSemRequisitos = document.querySelector("#radioSemRequisitos")
var radioRequisitos = document.querySelector("#radioRequisitos")
var inputRequisitos = document.querySelector("#requisitos")

var radioGratis = document.querySelector("#radioGratis")
var radioValor = document.querySelector("#radioValor")
var inputValue = document.querySelector("#valor")

radioSemRequisitos.addEventListener("click",function(){
    inputRequisitos.value = "Sem requisitos"
    inputRequisitos.disabled = true
});

radioRequisitos.addEventListener("click",function(){
    inputRequisitos.value = ""
    inputRequisitos.disabled = false
});

radioGratis.addEventListener("click",function(){
    inputValue.setAttribute("type","text")
    inputValue.value = "Grátis"
    inputValue.disabled = true
})

radioValor.addEventListener("click",function(){
    inputValue.value = ""
    inputValue.disabled = false
})
