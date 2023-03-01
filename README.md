# API de Setores 
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL3-blue.svg)](https://opensource.org/licenses/gpl-3.0.html)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021-2-SiGeD-Sectors&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021-2-SiGeD-Sectors)

Essa API faz parte da arquitetura de microsserviços do projeto [`SiGeD`](https://github.com/fga-eps-mds/2021-2-SiGeD-Doc), sua funcionalidade é possibilitar o controle dos dados dos setores. 

## Como contribuir?

Gostaria de contribuir com nosso projeto? Acesse o nosso [guia de contribuição](https://fga-eps-mds.github.io/2021-2-SiGeD-Doc/contribuicao/) onde são explicados todos os passos.
Caso reste alguma dúvida, você também pode entrar em contato conosco criando uma issue.

## Documentação

A documentação do projeto pode ser acessada pelo nosso site em https://fga-eps-mds.github.io/2021-2-SiGeD-Doc/.

## Testes

Todas as funções adicionadas nessa API devem ser testadas, o repositŕorio aceita até 20% do total de lihas não testadas. Para rodar os testes nesse repositŕio deve ser executado o comando:

```bash
docker-compose run backend_sector bash -c  "yarn && yarn jest --coverage --forceExit"
```

## Como rodar?

Para rodar a API é preciso usar os seguintes comandos usando o docker:

Crie uma network para os containers da API, caso não exista:

```bash
docker network create siged_backend
```

Suba o container com o comando:

```bash
docker-compose up
```
A API estará rodando na [porta 3004](http://localhost:3004).

## Seeders

Para popular a base de dados (após subir o docker-compose) com dados exemplos use os seguintes comandos:

```bash
docker exec -it backend_sector bash -c "node src/seeders/seedSector.js"
```

Para resetar o banco use o comando:

```bash
docker-compose rm
```

## Rotas

**GET: `/sector/`**

Para receber os dados dos setores.

**GET: `/sector/:id`**

Para receber os dados de um setor específico utilizando o `id`.

**GET: `/sector/newest-four`**

Para receber os dados dos últimos quatro setores adicionados, incluindo desativados.

**GET: `/sector/newest-four-active`**

Para receber os dados dos últimos quatro setores adicionados.

**POST: `/sector/create`**

Para criar um novo setor, envie os dados nesse formato:

```json
{
    "name": "Nome do Setor",
    "description": "Descrição do Setor",
}
```

**PUT: `/sector/update/:id`**

Para atualizar os dados do setor, envie os dados atualizados seguindo o padrão:

```json
{
   "name": "Nome do Setor",
    "description": "Descrição do Setor Atualizada",
}
```

**PUT: `/sector/deactivate/:id`**

Para desativar um setor pelo `id`.

**DELETE: `/sector/delete/:id`**

Para deletar um setor pelo `id`.
