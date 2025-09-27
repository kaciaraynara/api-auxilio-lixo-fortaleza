const request = require('supertest');
const express = require('express');

// Importa as rotas
const pessoasRoutes = require('../src/routes/pessoa.routes');
const abrigosRoutes = require('../src/routes/abrigo.routes');

// Importa o banco de dados para podermos inspecionar e resetar o estado entre os testes
const db = require('../src/database/database');

const app = express();
app.use(express.json());
app.use('/pessoas', pessoasRoutes);
app.use('/abrigos', abrigosRoutes);

// Função para resetar o estado do banco de dados antes de cada suíte de testes
const resetDatabase = () => {
    db.pessoas = [];
    db.proximoIdPessoa = 1;
    db.abrigos = [
        { id: 1, nome: "Abrigo Boa Esperança", endereco: "Rua das Flores, 123", vagas_total: 50, vagas_disponiveis: 15 },
        { id: 2, nome: "Casa de Acolhimento Luz", endereco: "Avenida Central, 456", vagas_total: 30, vagas_disponiveis: 5 },
        { id: 3, nome: "Abrigo Sem Vagas", endereco: "Rua Teste, 0", vagas_total: 10, vagas_disponiveis: 0 }
    ];
    db.proximoIdAbrigo = 4;
};


describe('Testes de Integração da API - Pessoas', () => {
    beforeEach(() => {
        resetDatabase(); // Garante um estado limpo para cada teste
    });

    it('Deve criar uma nova pessoa sem abrigo', async () => {
        const response = await request(app)
            .post('/pessoas')
            .send({ nome: 'João da Silva', observacoes: 'Chegou hoje' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe('João da Silva');
        expect(response.body.abrigoId).toBeNull();
    });

    it('Deve retornar erro 400 se o nome não for fornecido', async () => {
        const response = await request(app)
            .post('/pessoas')
            .send({ observacoes: 'Sem nome' });
        expect(response.statusCode).toBe(400);
    });

    it('Deve listar todas as pessoas', async () => {
        await request(app).post('/pessoas').send({ nome: 'Pessoa Teste' });
        const response = await request(app).get('/pessoas');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
    });

    it('Deve retornar uma pessoa específica por ID', async () => {
        const novaPessoa = await request(app).post('/pessoas').send({ nome: 'Maria Oliveira' });
        const pessoaId = novaPessoa.body.id;
        const response = await request(app).get(`/pessoas/${pessoaId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(pessoaId);
    });

    it('Deve retornar erro 404 para um ID de pessoa inexistente', async () => {
        const response = await request(app).get('/pessoas/9999');
        expect(response.statusCode).toBe(404);
    });
});

describe('Testes de Integração da API - Abrigos', () => {
    beforeEach(() => {
        resetDatabase();
    });

    it('Deve listar todos os abrigos', async () => {
        const response = await request(app).get('/abrigos');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(3);
    });

    it('Deve atualizar o número de vagas de um abrigo', async () => {
        const novasVagas = 10;
        const response = await request(app)
            .put('/abrigos/1/vagas')
            .send({ vagas_disponiveis: novasVagas });
        expect(response.statusCode).toBe(200);
        expect(response.body.vagas_disponiveis).toBe(novasVagas);
    });

    it('Deve retornar erro 404 para um abrigo inexistente ao atualizar vagas', async () => {
        const response = await request(app)
            .put('/abrigos/9999/vagas')
            .send({ vagas_disponiveis: 5 });
        expect(response.statusCode).toBe(404);
    });

    it('Deve retornar erro 400 se vagas_disponiveis não for um número', async () => {
        const response = await request(app)
            .put('/abrigos/1/vagas')
            .send({ vagas_disponiveis: 'muitas' });
        expect(response.statusCode).toBe(400);
    });
});


describe('Testes de Integração - Alocação de Pessoas em Abrigos', () => {
    beforeEach(() => {
        resetDatabase();
    });

    it('Deve criar uma pessoa e alocá-la a um abrigo, diminuindo a vaga', async () => {
        const abrigoId = 1;
        const vagasAntes = db.abrigos.find(a => a.id === abrigoId).vagas_disponiveis;

        const response = await request(app)
            .post('/pessoas')
            .send({ nome: 'José Alocado', abrigoId: abrigoId });

        expect(response.statusCode).toBe(201);
        expect(response.body.abrigoId).toBe(abrigoId);

        const vagasDepois = db.abrigos.find(a => a.id === abrigoId).vagas_disponiveis;
        expect(vagasDepois).toBe(vagasAntes - 1);
    });

    it('Deve retornar erro ao tentar criar pessoa em abrigo sem vagas', async () => {
        const response = await request(app)
            .post('/pessoas')
            .send({ nome: 'Pessoa Sem Sorte', abrigoId: 3 }); // Abrigo 3 não tem vagas
        expect(response.statusCode).toBe(400);
    });

    it('Deve alocar uma pessoa existente a um abrigo', async () => {
        // 1. Cria a pessoa
        const pessoaResponse = await request(app).post('/pessoas').send({ nome: 'Ana a Alocar' });
        const pessoaId = pessoaResponse.body.id;
        
        // 2. Pega as vagas do abrigo antes
        const abrigoId = 2;
        const vagasAntes = db.abrigos.find(a => a.id === abrigoId).vagas_disponiveis;

        // 3. Aloca a pessoa
        const alocacaoResponse = await request(app).post(`/pessoas/${pessoaId}/alocar/${abrigoId}`);
        expect(alocacaoResponse.statusCode).toBe(200);

        // 4. Verifica se a vaga diminuiu
        const vagasDepois = db.abrigos.find(a => a.id === abrigoId).vagas_disponiveis;
        expect(vagasDepois).toBe(vagasAntes - 1);

        // 5. Verifica se a pessoa foi atualizada no "banco"
        const pessoaAtualizada = db.pessoas.find(p => p.id === pessoaId);
        expect(pessoaAtualizada.abrigoId).toBe(abrigoId);
    });

    it('Deve realocar uma pessoa, liberando a vaga do abrigo antigo', async () => {
        // 1. Cria pessoa já alocada no abrigo 1
        await request(app).post('/pessoas').send({ nome: 'Carlos Migrante', abrigoId: 1 });
        const vagasAbrigo1_Antes = db.abrigos.find(a => a.id === 1).vagas_disponiveis; // Ex: 14
        const vagasAbrigo2_Antes = db.abrigos.find(a => a.id === 2).vagas_disponiveis; // Ex: 5

        // 2. Realoca a pessoa para o abrigo 2
        const pessoaId = 1;
        const novoAbrigoId = 2;
        await request(app).post(`/pessoas/${pessoaId}/alocar/${novoAbrigoId}`);

        // 3. Verifica as vagas
        const vagasAbrigo1_Depois = db.abrigos.find(a => a.id === 1).vagas_disponiveis;
        const vagasAbrigo2_Depois = db.abrigos.find(a => a.id === 2).vagas_disponiveis;

        expect(vagasAbrigo1_Depois).toBe(vagasAbrigo1_Antes + 1); // Vaga antiga foi liberada
        expect(vagasAbrigo2_Depois).toBe(vagasAbrigo2_Antes - 1); // Vaga nova foi ocupada
    });
});
