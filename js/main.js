'use strict';

const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparFormulario();
    
    // Pegando id cep e atribuindo valor na url
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        //retorna o valor da url em formato de promisse
        const receberDados = await fetch(url); //recebendo resultado do fetch
        //fetch: busca recursos de forma assíncrona através da rede

        // aguardar os dados do metodo json
        const endereco = await receberDados.json(); //pegando os dados e aplicando a função json, retornando os dados em formato json
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

//pegando o elemento id e adicionando a função pesquisarcep apos um focusout no elemento
document.getElementById('cep').addEventListener('focusout',pesquisarCep);

// fetch(url).then(response => response.json().then)