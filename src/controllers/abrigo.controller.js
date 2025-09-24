// src/controllers/abrigo.controller.js

// Importa os dados do banco de dados em memória
const db = require('../database/database.js');

// Função para LISTAR todos os abrigos (GET)
const listarAbrigos = (req, res) => {
  res.status(200).json(db.abrigos);
};

// Função para ATUALIZAR as vagas de um abrigo (PUT)
const atualizarVagas = (req, res) => {
  const { id } = req.params;
  const { vagas_disponiveis } = req.body;

  const abrigo = db.abrigos.find(a => a.id === parseInt(id));

  if (!abrigo) {
    return res.status(404).json({ error: 'Abrigo não encontrado.' });
  }

  if (vagas_disponiveis === undefined || typeof vagas_disponiveis !== 'number') {
    return res.status(400).json({ error: 'O campo "vagas_disponiveis" é obrigatório e deve ser um número.' });
  }

  abrigo.vagas_disponiveis = vagas_disponiveis;

  res.status(200).json(abrigo);
};

// Exporta as funções
module.exports = {
  listarAbrigos,
  atualizarVagas,
};
