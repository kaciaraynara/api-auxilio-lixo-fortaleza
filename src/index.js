// src/index.js

// 1. Importações
const express = require('express');

// 2. Inicialização do Express
const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta do ambiente ou a 3000

// 3. Middlewares
// Middleware para permitir que o Express entenda requisições com corpo em JSON
app.use(express.json());

// 4. Importação das Rotas
const pessoasRoutes = require('./routes/pessoa.routes.js');
const abrigosRoutes = require('./routes/abrigo.routes.js');

// 5. Definição das Rotas
// Rota principal para verificar se a API está online
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'API de Coordenação de Atendimento à População em Situação de Rua - No Ar!'
  });
});

// Associa as rotas importadas com seus respectivos prefixos
app.use('/pessoas', pessoasRoutes);
app.use('/abrigos', abrigosRoutes);


// 6. Inicialização do Servidor
// O servidor começa a "escutar" por requisições na porta definida
app.listen(PORT, () => {
  console.log(`Servidor executando em http://localhost:${PORT}`);
});
