<p align="center">
  <img src=".github/images/docker.svg" alt="Docker" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src=".github/images/node.svg" alt="Node" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src=".github/images/typescript.svg" height="100px" alt="ts" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src=".github/images/terminal.svg" alt="Terminal" />
  <img src=".github/images/mongo.svg" alt="Mongo" />&nbsp;&nbsp;&nbsp;&nbsp;
</a>

<p align="center">
  <a href="#rocket-desafio">Desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pushpin-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;
</p>

## :rocket: desafio

A proposta é fazer um serviço de transferência que será utilizado por outros serviços dentro de uma
mesma empresa. O seu serviço deve receber requisição para efetuar uma Transferência de um
determinado valor (considerar 2 casas decimais), enviar os dados necessários para a plataforma de
Liquidação do banco e retornar uma resposta para o serviço do cliente.
O serviço de Transferência deve receber uma informação opcional de “data de vencimento” que deve
ser avaliado para que você não envie transferências vencidas. Além disso todas as operações devem ser
salvas no BD.

<br/><br/>
O usuario para acessar a aplicação web caso você tenha executado as `seeds` é:

login: admin@fastfeet.com<br/>
senha: 123456

## :pushpin: Funcionalidades

Uma descrição resumida das duas principais funcionalidades presentes na aplicação.

### Criação de transferência

Funcionalidade responsável por criar ou agendar uma transferência.

### Consulta de transferência

Funcionalidade responsável retornar as informações consultas pelo cliente através de um ID.

### Processamento de transferências agendadas (Schedule)

Funcionalidade auxiliar que tem como objetivo processar todas as tranferências sejam elas agendadas ou não, definindo seu status para aprovada (APPROVED) ou rejeitada (REJECTED), conforme a solicitação do desafio.

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

:rotating_light: Cuidado ao definir 'http://localhost:3000' nas variaveis de ambiente quando usar o docker, o mesmo pode não conseguir se comunicar.

Se precisar buildar as informações novamente basta executar:

```bash
# Execute o gerenciador do docker para subir a aplicação
$ docker-compose up --build
```

---

Feito com carinho por [Dário Santos](https://www.linkedin.com/in/dario-bennaia/) :purple_heart: :rocket:!
