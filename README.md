
# AEP Authentication Project

Este projeto fornece um sistema de autenticação completo com verificação de e-mail e SMS, desenvolvido utilizando NestJS para a API e Express com EJS para o Frontend. A rota principal do sistema é `http://localhost:3001/inicio`.

## Sumário
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Executar](#como-executar)
  - [API](#api)
  - [Frontend](#frontend)
- [Estrutura de Pastas](#estrutura-de-pastas)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 16.x ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- Uma conta Twilio (ou outro serviço de SMS) se for utilizar o envio de SMS de verificação

## Instalação e Configuração

1. Clone o repositório para sua máquina local:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. Instale as dependências necessárias para a API e o Frontend.

   ```bash
   # Instale as dependências da API
   cd API_AEP
   npm install

   # Instale as dependências do Frontend
   cd ../FRONT_AEP
   npm install
   ```

3. Configure as variáveis de ambiente:
   - **API**: Renomeie o arquivo `.env.example` para `.env` na pasta `API_AEP` e ajuste as variáveis de acordo com suas configurações (exemplo: conexão com banco de dados, chaves para o Twilio, configurações JWT).
   - **Frontend**: Renomeie o arquivo `.env.example` para `.env` na pasta `FRONT_AEP` e configure as variáveis, se necessário.

## Como Executar

### API

1. Certifique-se de estar na pasta `API_AEP`.
2. Inicie o Docker e a aplicação com o comando:
   ```bash
   docker compose up
   npm run start:dev
   ```
3. A API será executada em `http://localhost:3000`.

### Frontend

1. Navegue para a pasta `FRONT_AEP`.
2. Inicie o servidor de desenvolvimento com o comando:
   ```bash
   npm run dev
   ```
3. Acesse o Frontend em `http://localhost:3001/inicio`.

## Estrutura de Pastas

- **API_AEP**: Contém o código da API desenvolvida em NestJS.
  - Iniciar com `docker compose up` e `npm run start:dev`
- **FRONT_AEP**: Contém o código do Frontend em Express e EJS.
  - Iniciar com `npm run dev`

---

Acesse o sistema pela rota principal em `http://localhost:3001/inicio` e siga as instruções de autenticação fornecidas na interface.