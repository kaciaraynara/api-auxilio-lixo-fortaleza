// src/database/database.js

// Simulação de um banco de dados em memória

let pessoas = [];
let proximoIdPessoa = 1;

let abrigos = [
    { id: 1, nome: "Abrigo Boa Esperança", endereco: "Rua das Flores, 123", vagas_total: 50, vagas_disponiveis: 15 },
    { id: 2, nome: "Casa de Acolhimento Luz", endereco: "Avenida Central, 456", vagas_total: 30, vagas_disponiveis: 5 }
];
let proximoIdAbrigo = 3;

// Exportamos os dados e os próximos IDs para que possam ser manipulados pelos controllers
module.exports = {
    pessoas,
    proximoIdPessoa,
    abrigos,
    proximoIdAbrigo
};
