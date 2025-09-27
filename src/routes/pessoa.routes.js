// src/routes/pessoa.routes.js
const express = require('express');
const router = express.Router();

// Importa o controller de pessoas
const pessoaController = require('../controllers/pessoa.controller.js');

// Define as rotas para a entidade "Pessoa"
router.post('/', pessoaController.criarPessoa); // Rota para criar uma pessoa
router.get('/', pessoaController.listarPessoas); // Rota para listar todas as pessoas
router.get('/:id', pessoaController.buscarPessoaPorId); // Rota para buscar uma pessoa por ID
router.post('/:id/alocar/:abrigoId', pessoaController.alocarPessoaEmAbrigo); // Rota para alocar uma pessoa em um abrigo

module.exports = router;
