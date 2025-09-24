# API - Sistema de Coordenação para Atendimento à População em Situação de Rua

## 1. Objetivo do Trabalho

O objetivo deste projeto é desenvolver uma API centralizada para coordenar e otimizar o atendimento à população em situação de rua em Fortaleza. A API integra diferentes sistemas, como os utilizados por agentes de campo e centros de acolhimento (abrigos), permitindo um fluxo de informação mais eficiente e em tempo real sobre os recursos disponíveis e o histórico de atendimentos.

Este projeto está alinhado com o **ODS 11 (Cidades e Comunidades Sustentáveis)** da ONU, ao buscar tornar as cidades mais inclusivas, seguras e resilientes, garantindo o acesso a moradia e serviços básicos para os segmentos mais vulneráveis da população.

## 2. Arquitetura da Solução

A solução foi desenvolvida utilizando uma arquitetura baseada em serviços (API RESTful) com Node.js e o framework Express. A principal responsabilidade da API é centralizar as informações e fornecer endpoints para que diferentes clientes (sistemas de ONGs, aplicativos de agentes de campo, etc.) possam consumir e manipular os dados de forma padronizada.

*(Aqui você pode inserir o diagrama de arquitetura que desenhou)*

## 3. Documentação das Rotas da API

A seguir estão detalhados os endpoints disponíveis na API.

### Entidade: Pessoas

- **`POST /pessoas`**
  - **Descrição:** Cadastra uma nova pessoa encontrada em situação de rua.
  - **Corpo da Requisição (JSON):**
    ```json
    {
      "nome": "Nome da Pessoa",
      "observacoes": "Detalhes sobre a pessoa ou a situação."
    }
    ```
  - **Resposta de Sucesso (201):** Retorna o objeto da pessoa criada.

- **`GET /pessoas`**
  - **Descrição:** Lista todas as pessoas cadastradas.
  - **Resposta de Sucesso (200):** Retorna um array de objetos de pessoas.

- **`GET /pessoas/:id`**
  - **Descrição:** Busca uma pessoa específica pelo seu ID.
  - **Resposta de Sucesso (200):** Retorna o objeto da pessoa encontrada.

### Entidade: Abrigos

- **`GET /abrigos`**
  - **Descrição:** Lista todos os abrigos cadastrados e a situação atual de suas vagas.
  - **Resposta de Sucesso (200):** Retorna um array de objetos de abrigos.

- **`PUT /abrigos/:id/vagas`**
  - **Descrição:** Atualiza o número de vagas disponíveis de um abrigo específico.
  - **Corpo da Requisição (JSON):**
    ```json
    {
      "vagas_disponiveis": 14
    }
    ```
  - **Resposta de Sucesso (200):** Retorna o objeto completo do abrigo atualizado.

## 4. Instruções de Execução e Testes

1.  **Instalação:**
    Clone o repositório e execute `npm install` para instalar as dependências.

2.  **Execução:**
    Execute `npm start` para iniciar o servidor. A API estará disponível em `http://localhost:3000`.

3.  **Testes (Postman/Insomnia):**
    A coleção de testes para o Postman/Insomnia está incluída no repositório (`collection.json`). Importe este arquivo para a sua ferramenta de testes para executar as requisições para cada endpoint.
