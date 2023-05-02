var formulario = document.querySelector("#novoItem")
var arrayNomes = []
var arrayTotal = []


formulario.addEventListener("submit", (evento)=>{

    evento.preventDefault()

    //console.log(evento.target[0].value) //--> Mostra o valor do input 0, ou seja, dentro do form tem dois inputs, e quando o form for acionado, vai mostrar o valor de dentro do input 

    //console.log(evento.target.elements['nome'].value) //--> Pega o nome do input de name="nome"
    //console.log(evento.target.elements['quantidade'].value) //--> Pega o numero do input com name="quantidade" 
    //console.log(evento.target.elements["valor"].value)

    var containerParaCriarLI = document.querySelector(".lista")
    var criaLI = document.createElement("li")
    
    var nome = evento.target.elements['nome'].value
    var quantidade = evento.target.elements['quantidade'].value
   

    //Conta
    var quantidadeDeProdutos = evento.target.elements['quantidade']
    var quantidadeDeProdutosParaConta = Number(quantidadeDeProdutos.value)

    var valor = evento.target.elements['valor'].value
    var formatadoEmReal = Number(valor).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    var valorDoProduto = formatadoEmReal

    var ValorTotaldoProduto = quantidadeDeProdutosParaConta * valor
    var ValorTotaldoProdutoTransformadoEmReal = Number(ValorTotaldoProduto).toLocaleString('pt-br', {style: 'currency', currency: 'BRL',minimumFractionDigits: 2});

    console.log("O nome do produto é: " + nome)
    console.log("Esta é a quantidade de produtos: " + quantidadeDeProdutosParaConta)
    console.log("Este é o valor do produto: " + valorDoProduto);
    
    console.log("Este é patrimônio total deste produto " + ValorTotaldoProdutoTransformadoEmReal )
    //Fim


    if(nome == Number(nome)){
        alert("Não são permitidos apenas números como nome! \nTente Produto "+ nome)
    }
    else if(valor == 0 && quantidade == 0){
        alert("Defina uma quantidade de produtos e um valor para cada unidade!")
    }
    else if(quantidade == 0){
        alert("Defina uma quantidade de produtos!")
    } 
    else if(valor == 0){
        alert("Defina o valor de cada unidade!")
    }
    else if(quantidade >= 1 && arrayNomes.indexOf(nome) === -1){
        //Cria o Elemento na tela
        criaLI.innerHTML = `<strong>${quantidade}</strong> <p>${nome} - ${valorDoProduto}</p> <p class="valorDoItem">${ValorTotaldoProdutoTransformadoEmReal}</p>`
        criaLI.classList.add("item")
        containerParaCriarLI.appendChild(criaLI)

        //Destrava os botões
        document.querySelector(".apagar").style.display = "block"
        document.querySelector(".calcular").style.display = "block"

        //Adiciona elementos no Array de Valores
        arrayTotal.push(ValorTotaldoProduto)
        console.log(arrayTotal)

        //Adiciona elementos no Array de Nomes
        arrayNomes.push(nome)
        console.log(arrayNomes)

    }else{
        alert("Já tem um item com o nome " + nome)
    }
})



// Apagar
var lista = document.querySelector("ul")

var quantidadeLista = document.querySelectorAll("ul li").length

if(quantidadeLista < 1){
    document.querySelector(".apagar").style.display = "none"
    document.querySelector(".calcular").style.display = "none"
}


function reiniciar(){

    var pergunta = window.confirm("Você irá apagar todos itens adicionados, deseja mesmo fazer isso?")

    if(pergunta){
        window.location.reload(true);
    }else{

    }
}




function calcular(){

    var containerValores = 0

    for(var i = 0; i < arrayTotal.length;i++){

        containerValores+= arrayTotal[i]

        console.log(containerValores)
    }

    var oProdutoMaisBarato = Math.min(...arrayTotal);// -> Mostra o menor valor do array
    var PosicaoMaisBarato = arrayTotal.indexOf(oProdutoMaisBarato)// -> Mostra qual a posição que ele se encontra no array

    var oProdutoMaisCaro = Math.max(...arrayTotal);// -> Mostra o maior valor do array
    var PosicaoMaisCaro = arrayTotal.indexOf(oProdutoMaisCaro)// -> Mostra qual posição ele se encontra no array

    console.log(oProdutoMaisBarato);
    console.log(PosicaoMaisBarato);
    console.log(oProdutoMaisCaro);
    console.log(PosicaoMaisCaro);

    var Total = Number(containerValores).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    var TotalCaro = Number(oProdutoMaisCaro).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    var TotalBarato = Number(oProdutoMaisBarato).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

    alert(
    `O valor total em produtos é de ${Total} 
    \nO produto com o total mais caro é o "${arrayNomes[PosicaoMaisCaro]}", com um valor de ${TotalCaro} 
    \nO produto com o total mais baixo é o "${arrayNomes[PosicaoMaisBarato]}", com um valor de ${TotalBarato}`
    )
}


