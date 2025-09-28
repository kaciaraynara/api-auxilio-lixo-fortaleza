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

- **`POST /pessoas/:id/alocar/:abrigoId`**
  - **Descrição:** Aloca ou realoca uma pessoa já existente em um abrigo. A API automaticamente decrementa a vaga no novo abrigo e, se aplicável, incrementa a vaga no abrigo antigo.
  - **Parâmetros de URL:**
    - `id`: ID da pessoa a ser alocada.
    - `abrigoId`: ID do abrigo de destino.
  - **Resposta de Sucesso (200):** Retorna uma mensagem de confirmação.
  - **Respostas de Erro:**
    - `404`: Pessoa ou Abrigo não encontrado.
    - `400`: Abrigo sem vagas disponíveis.

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

## 5. Equipe e Contribuições

Este projeto foi desenvolvido pela seguinte equipe:

- **ANA CRISTINA CASTELO BRANCO RODRIGUES:** Análise de Requisitos e Documentação.
- **JESSICA BAROSSO CAMPOS:** Modelagem de Dados e Arquitetura da API.
- **ANDRESSA DE OLIVEIRA MELO:** Desenvolvimento do Módulo de Abrigos (Controller e Rotas).
- **RAYNARA KACIA MAGALHAES FONTELES:** Desenvolvimento do Módulo de Pessoas (Controller e Rotas).
- **RUBEN LEVI DE OLIVEIRA CARIOLANO:** Implementação da Lógica de Integração e Testes Automatizados.
- **MARCOS VINICIUS BONFIM SILVA EVANGELISTA:** Configuração do Ambiente, Versionamento com Git e Implantação.
- **GitHub Copilot:** Assistente de desenvolvimento, auxiliando na criação de código, testes e documentação.
