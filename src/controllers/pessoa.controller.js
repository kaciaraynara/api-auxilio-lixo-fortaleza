// src/controllers/pessoa.controller.js

// Importa os dados do banco de dados em memória
const db = require('../database/database.js');

// Função para CRIAR uma nova pessoa (POST)
const criarPessoa = (req, res) => {
  const { nome, observacoes, abrigoId } = req.body; // Adicionado abrigoId

  // Validação simples
  if (!nome) {
    return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
  }

  // --- INÍCIO DA INTEGRAÇÃO ---
  let abrigo = null;
  if (abrigoId) {
    abrigo = db.abrigos.find(a => a.id === parseInt(abrigoId));
    if (!abrigo) {
      return res.status(404).json({ error: 'Abrigo não encontrado.' });
    }
    if (abrigo.vagas_disponiveis === 0) {
      return res.status(400).json({ error: 'Abrigo sem vagas disponíveis.' });
    }
  }
  // --- FIM DA INTEGRAÇÃO ---

  const novaPessoa = {
    id: db.proximoIdPessoa++,
    nome,
    observacoes: observacoes || '',
    data_cadastro: new Date().toISOString(),
    abrigoId: abrigoId || null // Armazena o ID do abrigo
  };

  db.pessoas.push(novaPessoa);

  // --- INÍCIO DA INTEGRAÇÃO ---
  // Se a pessoa foi alocada a um abrigo, atualiza o número de vagas
  if (abrigo) {
    abrigo.vagas_disponiveis--;
  }
  // --- FIM DA INTEGRAÇÃO ---


  // Retorna a pessoa criada com o status 201 (Created)
  res.status(201).json(novaPessoa);
};

// Função para LISTAR todas as pessoas (GET)
const listarPessoas = (req, res) => {
  res.status(200).json(db.pessoas);
};

// Função para BUSCAR uma pessoa por ID (GET)
const buscarPessoaPorId = (req, res) => {
  const { id } = req.params;
  const pessoa = db.pessoas.find(p => p.id === parseInt(id));

  if (!pessoa) {
    return res.status(404).json({ error: 'Pessoa não encontrada.' });
  }

  res.status(200).json(pessoa);
};

// --- INÍCIO DA INTEGRAÇÃO ---
// Função para ALOCAR uma pessoa a um abrigo (POST)
const alocarPessoaEmAbrigo = (req, res) => {
    const { id, abrigoId } = req.params;

    const pessoa = db.pessoas.find(p => p.id === parseInt(id));
    if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }

    const abrigo = db.abrigos.find(a => a.id === parseInt(abrigoId));
    if (!abrigo) {
        return res.status(404).json({ error: 'Abrigo não encontrado.' });
    }

    if (abrigo.vagas_disponiveis === 0) {
        return res.status(400).json({ error: 'Abrigo sem vagas disponíveis.' });
    }

    // Se a pessoa já estava em outro abrigo, libera a vaga antiga
    if (pessoa.abrigoId) {
        const abrigoAntigo = db.abrigos.find(a => a.id === pessoa.abrigoId);
        if (abrigoAntigo) {
            abrigoAntigo.vagas_disponiveis++;
        }
    }

    // Aloca a pessoa no novo abrigo
    pessoa.abrigoId = abrigo.id;
    abrigo.vagas_disponiveis--;

    res.status(200).json({ message: `Pessoa ${pessoa.nome} alocada com sucesso no abrigo ${abrigo.nome}.` });
};
// --- FIM DA INTEGRAÇÃO ---


// Exporta as funções para serem usadas nas rotas
module.exports = {
  criarPessoa,
  listarPessoas,
  buscarPessoaPorId,
  alocarPessoaEmAbrigo, // Exporta a nova função
};
