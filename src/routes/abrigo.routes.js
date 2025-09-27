// src/routes/abrigo.routes.js
const express = require('express');
const router = express.Router();

// Importa o controller de abrigos
const abrigoController = require('../controllers/abrigo.controller.js');

// Define as rotas para a entidade "Abrigo"
router.get('/', abrigoController.listarAbrigos); // Rota para listar todos os abrigos
router.put('/:id/vagas', abrigoController.atualizarVagas); // Rota para atualizar as vagas de um abrigo

module.exports = router;
