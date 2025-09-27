# Arquitetura da Solução

A solução foi desenvolvida utilizando uma arquitetura de API RESTful monolítica, construída com **Node.js** e o framework **Express.js**. A escolha por um monólito bem estruturado se deu pela simplicidade de implantação e pela coesão do escopo do projeto.

## Componentes Principais

1.  **Servidor (Express.js):** O arquivo `src/index.js` é o ponto de entrada da aplicação. Ele inicializa o servidor Express, configura os middlewares (como o `express.json` para parsear o corpo das requisições) e carrega as rotas principais.

2.  **Rotas (`routes/`):** A pasta `src/routes` define os endpoints da API. Cada arquivo (ex: `pessoa.routes.js`) agrupa as rotas relacionadas a uma entidade específica, associando os caminhos (URLs) e os métodos HTTP (GET, POST, PUT) às funções correspondentes nos controllers.

3.  **Controllers (`controllers/`):** A pasta `src/controllers` contém a lógica de negócio da aplicação. Cada função em um controller é responsável por receber a requisição, interagir com a camada de dados, processar as informações e enviar uma resposta ao cliente. É aqui que a integração entre "Pessoas" e "Abrigos" acontece.

4.  **Camada de Dados (`database/`):** Para este projeto, foi utilizada uma simulação de banco de dados em memória, centralizada no arquivo `src/database/database.js`. Este módulo exporta os arrays de dados (`pessoas`, `abrigos`) e permite que os controllers manipulem um estado compartilhado e consistente. Em uma aplicação de produção, este módulo seria substituído por uma conexão a um banco de dados real (como PostgreSQL, MongoDB, etc.).

## Fluxo de uma Requisição

1.  O cliente (um app, um site, etc.) faz uma chamada HTTP para um endpoint da API (ex: `POST /pessoas`).
2.  O servidor Express recebe a requisição e, com base na URL, a direciona para o roteador correspondente (ex: `pessoa.routes.js`).
3.  O roteador invoca a função do controller associada (ex: `criarPessoa`).
4.  O controller processa a requisição, valida os dados e interage com o `database.js` para persistir a informação.
5.  O controller formula uma resposta (JSON) e a envia de volta ao cliente com o status HTTP apropriado (ex: 201 Created).
