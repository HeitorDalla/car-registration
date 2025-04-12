"use strict";

const containerResultado = document.querySelector("#container-resultado");

const nome = document.querySelector("#nome");
const portas = document.querySelector("#portas");
const blindagem = document.querySelector("#blindagem");
const municao = document.querySelector("#municao");

const normal = document.querySelector("#normal");
const militar = document.querySelector("#militar");

let carros = [];

// Criação de classes
class Carro {
    constructor (nome, portas) {
        (() => {
            const newElement = document.createElement("div");
            newElement.setAttribute("class", "novoCarro");
            newElement.innerHTML = `
                Nome: ${nome} |
                Portas: ${portas}
            `;

            // Evento para a implementação da lógica de selecionar um carro
            newElement.addEventListener("click", (event) => {
                event.stopPropagation();

                document.querySelectorAll(".novoCarro").forEach((carro) => {
                    carro.classList.remove("selecionado");
                });
                
                newElement.classList.add("selecionado");
            });

            containerResultado.appendChild(newElement);
            limparCampos();
        })();
    }
};

class Normal extends Carro {
    constructor (nome, portas, blindagem, municao) {
        super (nome, portas)
        
        // Adicionar o carro ao array carros
        carros.push({ 
            nome: nome,
            portas: portas
        });

        blindagem.disabled = true,
        municao.disabled = true
    }
};

class Militar extends Carro {
    constructor (nome, portas, blindagem, municao) {
        super (nome, portas);

        // Adicionar o carro ao array carros
        carros.push({ 
            nome: nome,
            portas: portas,
            blindagem: blindagem.value,
            municao: municao.value
        });

        blindagem.disabled = false;
        municao.disabled = false;

        const ultimoCarro = document.querySelectorAll(".novoCarro");
        const carro = ultimoCarro[ultimoCarro.length - 1];
        carro.innerHTML = `
            Nome: ${nome} |
            Portas: ${portas} |
            Blindagem: ${blindagem.value} |
            Munição: ${municao.value}
        `;

        limparCampos();
    }
};

// Função para limpar campos
function limparCampos () {
   nome.value = '';
   portas.value = '';
   blindagem.value = '';
   municao.value = '';

   nome.focus();
};

// Função para atualizar estado dos inputs de blindagem e muniçao
function mudarEstado () {
    if (normal.checked) {
        blindagem.disabled = true;
        municao.disabled = true;
    } else {
        blindagem.disabled = false;
        municao.disabled = false;
    }
};

// Adicionando o evento a atualização da página
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();

    limparCampos();

    mudarEstado();

    // Adicionando eventos para mudar o estado quando clicado em cima do input
    normal.addEventListener("change", mudarEstado);
    militar.addEventListener("change", mudarEstado);

    // Evento para o button cadastrar
    const cadastrar = document.querySelector("#cadastrar");
    cadastrar.addEventListener("click", (event) => {
        event.preventDefault();

        // Validações para os campos
        const validar = (() => {
            if ((() => 
                nome.value === "" || portas.value <= 0
            )()) {
                return false;
            }
        
            if ((() => 
                militar.checked && (blindagem.value <= 0 || municao.value <= 0)
            )()) {
                return false;
            }
        
            return true;
        })(); 

        if (!validar) {
            alert("Preencha todos os campos!");
            return;
        }
        
        normal.checked
            ? new Normal (nome.value, portas.value, blindagem, municao)
            : new Militar(nome.value, portas.value, blindagem, municao);
        
        // Verificar se existe algum carro cadastrado
        if (carros.length > 0) {
            remover.style.display = 'block';
        }
    });

    // Evento para button remover carro
    const remover = document.querySelector("#remover");
    remover.addEventListener("click", (event) => {
        event.preventDefault();

        const selecionado = [...document.querySelectorAll(".selecionado")][0];
        containerResultado.removeChild(selecionado);
    })
});