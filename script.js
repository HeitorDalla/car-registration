"use strict";

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
            carros.push({
                nome: nome,
                portas: portas
            });

            (() => { 
                const novoCarro = carros[carros.length - 1];

                const newElement = document.createElement("div");
                newElement.setAttribute("class", "novaPessoa");
                newElement.innerHTML = `
                    Nome: ${novoCarro.nome} |
                    Portas: ${novoCarro.portas}
                `;
                document.querySelector("#container-resultado").appendChild(newElement);
            })();

            document.querySelector("#nome").value = '';
            document.querySelector("#portas").value = '';
            
        })();
    }
};

class Normal extends Carro {
    constructor (nome, portas, blindagem, municao) {
        super (nome, portas)
        blindagem.disabled = true,
        municao.disabled = true
    }
};

class Militar extends Carro {
    constructor (nome, portas, blindagem, municao) {
        super (nome, portas);
        blindagem.disabled = false;
        municao.disabled = false;

        const ultimoCarro = document.querySelectorAll(".novaPessoa");
        const carro = ultimoCarro[ultimoCarro.length - 1];
        carro.innerHTML = `
            Nome: ${nome} |
            Portas: ${portas} |
            Blindagem: ${blindagem.value} |
            Munição: ${municao.value}
        `;
    }
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

    mudarEstado();

    // Adicionando eventos para mudar o estado quando clicado em cima do input
    normal.addEventListener("change", mudarEstado);
    militar.addEventListener("change", mudarEstado);

    // Adicionar evento para o button cadastrar
    document.querySelector("#cadastrar").addEventListener("click", (event) => {
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

            nome.value = "";
            portas.value = "";
            blindagem.value = "";
            municao.value = "";
            mudarEstado();
    });
});