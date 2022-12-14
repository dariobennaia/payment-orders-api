<p align="center">
  <img src=".github/images/docker.svg" alt="Docker" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src=".github/images/node.svg" alt="Node" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src=".github/images/typescript.svg" height="100px" alt="ts" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src=".github/images/terminal.svg" alt="Terminal" />
  <img src=".github/images/mongo.svg" alt="Mongo" />&nbsp;&nbsp;&nbsp;&nbsp;
</a>

<details open="open">
  <summary>Sumario</summary>
  <ol>
    <li>
      <a href="#rocket-desafio">Desafio do projeto</a>
      <ul>
        <li><a href="#pushpin-funcionalidades">Funcionalidades</a></li>
      </ul>
    </li>
    <li>
      <a href="#triangularruler-arquitetura">Arquitetura</a>
      <ul>
        <li><a href="#book-padrões">Padrões</a></li>
        <li><a href="#hammer-tecnologias">Tecnologias</a></li>
      </ul>
    </li>
    <li>
      <a href="#computer-como-usar">Como instalar</a>
    </li>
    <li>
      <a href="#sparkles-testes">Testes</a>
    </li>
    <li>
      <a href="#clipboard-openapi">OpenAPI</a>
    </li>
    <li>
      <a href="#question-perguntas">Dúvidas e questionamentos</a>
    </li>
  </ol>
</details>

## :rocket: desafio

A proposta é fazer um serviço de transferência que será utilizado por outros serviços dentro de uma
mesma empresa. O seu serviço deve receber requisição para efetuar uma Transferência de um
determinado valor (considerar 2 casas decimais), enviar os dados necessários para a plataforma de
Liquidação do banco e retornar uma resposta para o serviço do cliente.
O serviço de Transferência deve receber uma informação opcional de “data de vencimento” que deve
ser avaliado para que você não envie transferências vencidas. Além disso todas as operações devem ser
salvas no BD.

## :pushpin: Funcionalidades

Uma descrição resumida das duas principais funcionalidades presentes na aplicação.

- Criação de transferência

  - Funcionalidade responsável por criar ou agendar uma transferência.

- Consulta de transferência

  - Funcionalidade responsável retornar as informações consultas pelo cliente através de um ID.

- Processamento de transferências agendadas (Schedule)

  - Funcionalidade auxiliar que tem como objetivo processar todas as tranferências sejam elas agendadas ou não, definindo seu status para aprovada (APPROVED) ou rejeitada (REJECTED), conforme a solicitação do desafio.

## :triangular_ruler: Arquitetura

<img src=".github/images/arch.jpeg" alt="arch" />

## :book: Padrões

- Clean Code
- Clean Architeture
- DDD
- TDD
- KISS
- YAGNI

## :hammer: Tecnologias

Este Projeto foi desenvolvido usando as seguintes tecnologias:

- [Express](https://github.com/expressjs/express)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Swagger UI Express](https://www.npmjs.com/package/dotenv)
- [Mongo DB](https://www.npmjs.com/package/dotenv)
- [Node Schedule](https://www.npmjs.com/package/dotenv)

## :computer: Como usar

Para instalar a aplicação você precisará executar os passos informados abaixo.

### Instalação básica

```bash
# Clone o repositório
$ git clone https://github.com/dariobennaia/payment-orders-api.git

# Entre na pasta do projeto
$ cd payment-orders-api

# Instale as dependências
$ yarn install

# Crie o arquivo .env com base no modelo .env.example e preencha suas informações corretamente.
$ cp .env.example .env

# Execute a aplicação
$ yarn dev
```

:rotating_light: Importante! A execução do schedule é importante para que as transferencias sejam processadas.

```bash
$ yarn schedule
```

### Instalação usando o nosso :heart: amorzinho, o [docker](https://www.docker.com/).

:rotating_light: Importante! Certifique-se de que você possui o docker instalado em sua maquina. A versão usada no desenvolvimento deste projeto foi: [Docker](https://docs.docker.com/engine/release-notes/) e o [Docker Compose](https://docs.docker.com/compose/release-notes/). Para mais informações consulte a [documentação](https://www.docker.com/) oficial.

```bash
# Clone o repositório
$ git clone https://github.com/dariobennaia/payment-orders-api.git

# Entre na pasta do projeto
$ cd payment-orders-api

# Crie o arquivo .env com base no modelo .env.example e preencha suas informações corretamente.
$ cp .env.example .env

# Execute o gerenciador do docker para subir a aplicação
$ docker-compose up
```

Se precisar buildar as informações novamente basta executar:

```bash
# Execute o gerenciador do docker para subir a aplicação
$ docker-compose up --build
```

## :sparkles: Testes

Para executar os testes da aplicação, execute o comando abaixo.

:rotating_light: Importante! Certifique-se de ter executado a etapa de [instalação](#computer-como-usar) e de que o banco de dados esteja em execução, os testes dependem dessa conexão.

```bash
# Execute os testes unitário
$ yarn test
```

<img src=".github/images/tests.png" alt="tests" />

```bash
# Veja o coverage da aplicacao
$ yarn test:cov
```

<img src=".github/images/test-cov.png" alt="tests-cov" />

## :clipboard: OpenAPI

Para visualizar o swagger da aplicação, execute o comando abaixo.

```bash
$ yarn dev
```

Após o server ter iniciado, em seu navegador execute: http://localhost:3000/api-docs

<img src=".github/images/openapi.png" alt="openapi" />

## :question: Perguntas

Acredito que você possa esta se fazendo algumas perguntas, bom, deixa eu ver se eu consigo te responder.

- Por que usar um `SCHEDULE` para fazer o processamento das transferências?
  - O prazo para a entrega do desafio impactou no desenvolvimento de uma solução mais elaborada, fazendo com que outras alternativas fossem buscadas.

---

Feito com carinho por [Dário Santos](https://www.linkedin.com/in/dario-bennaia/) :purple_heart: :rocket:!
