# API - Sistema de Coordenação para Atendimento à População em Situação de Rua

![Status](https://imgshields.io/badge/status-concluído-green?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

Este projeto apresenta uma API centralizada para coordenar e otimizar o atendimento à população em situação de rua em Fortaleza, alinhado com os Objetivos de Desenvolvimento Sustentável da ONU.

# Descrição do Projeto

O objetivo deste projeto é desenvolver uma API RESTful para integrar diferentes sistemas, como os utilizados por agentes de campo e centros de acolhimento (abrigos). A plataforma permite um fluxo de informação mais eficiente e em tempo real sobre os recursos disponíveis e o histórico de atendimentos, visando maior eficácia nas ações de apoio.

Este projeto está alinhado com o **ODS 11 (Cidades e Comunidades Sustentáveis)** da ONU, ao buscar tornar as cidades mais inclusivas, seguras e resilientes, garantindo o acesso a moradia e serviços básicos para os segmentos mais vulneráveis da população.

# Funcionalidades

- ✔️ Cadastro e listagem de pessoas em situação de rua.
- ✔️ Consulta de abrigos e suas vagas disponíveis.
- ✔️ Atualização em tempo real do número de vagas de um abrigo.
- ✔️ Tratamento de erros e exceções para requisições inválidas.

## 💻 Tecnologias Utilizadas

- **Backend:** Node.js
- **Framework:** Express.js
- **Testes:** Postman

# Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/kaciaraynara/api-auxilio-lixo-fortaleza.git](https://github.com/kaciaraynara/api-auxilio-lixo-fortaleza.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd api-auxilio-fortaleza
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor:**
    ```bash
    npm start
    ```
5.  O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

A seguir, a documentação detalhada das rotas disponíveis.

---

### Entidade: Pessoas

#### `POST /pessoas`
- **Descrição:** Cadastra uma nova pessoa no sistema.
- **Corpo da Requisição:**
  ```json
  {
    "nome": "Nome da Pessoa",
    "observacoes": "Detalhes sobre a pessoa ou a situação."
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
    "id": 1,
    "nome": "Nome da Pessoa",
    "observacoes": "Detalhes sobre a pessoa ou a situação.",
    "data_cadastro": "2025-09-28T14:30:00.000Z",
    "abrigoid": null
  }
  ```

#### `GET /pessoas`
- **Descrição:** Lista todas as pessoas cadastradas.
- **Resposta de Sucesso (200 OK):** Retorna um array com todos os objetos de pessoas.

#### `GET /pessoas/:id`
- **Descrição:** Busca uma pessoa específica pelo seu ID.
- **Resposta de Sucesso (200 OK):** Retorna o objeto da pessoa encontrada.

---

### Entidade: Abrigos

#### `GET /abrigos`
- **Descrição:** Lista todos os abrigos e a situação atual de suas vagas.
- **Resposta de Sucesso (200 OK):** Retorna um array com todos os objetos de abrigos.

#### `PUT /abrigos/:id/vagas`
- **Descrição:** Atualiza o número de vagas disponíveis de um abrigo.
- **Corpo da Requisição:**
  ```json
  {
    "vagas_disponiveis": 14
  }
  ```
- **Resposta de Sucesso (200 OK):** Retorna o objeto completo do abrigo com as vagas atualizadas.

---

# Equipe do Projeto

| Nome | Matrícula | Função |
| :--- | :--- | :--- |
| **Andressa de Oliveira Melo** | 2326942 | Gerente de Projeto e Analista |
| **Raynara Kácia Magalhães Fonteles**| 2326298 | Tech Lead e Desenvolvedora Backend |
| **Marcos Vinicius Bonfim Silva** | 2325200 | Desenvolvedor Backend |
| **Jessica Barroso Campos** | 2326256 | Arquiteta da API e Documentação |
| **Ana Cristina C. B. Rodrigues** | 2326310 | Arquiteta de Banco de Dados |
| **Ruben Levi de Oliveira Cariolano**| 2323844 | Engenheiro de Qualidade e Testes (QA) |