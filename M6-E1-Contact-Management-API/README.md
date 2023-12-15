# M6-E1-Contact-Management

O Sistema de Gestão de Clientes e Contatos (SGCC) é uma solução eficiente e intuitiva desenvolvida para simplificar o cadastro e gerenciamento de clientes e seus respectivos contatos. Com foco na praticidade e organização, o SGCC permite que empresas e profissionais mantenham um registro detalhado de suas interações com clientes.

O projeto esta composto por duas pastas

- M6-E1-Contact-Management-API;
- M6-E1-Contact-Management-FrontEnd;

## É imprescindível que, antes de acessar as aplicações, você instale as dependências; caso contrário, não será possível acessar os projetos.

## Installation

```bash
$ npm install
```

Para abrir as aplicações é necesario acessar as pastas individualmente, se o comando para rodar a aplição for feito na pasta principal voce receberá mensagem de erro.

## M6-E1-Contact-Management-API

A API é responsável pela gestão de contatos, e possui as seguintes funcionalidades:

- Cadastrar um novo contato;
- Listar todos os contatos cadastrados;
- Buscar um contato específico pelo ID;
- Atualizar um contato existente;
- Deletar um contato.
  Para executar a aplicação basta abrir o terminal na raiz do diretório "M6-E1-Contact-Management-API"
  e rodar o comando `npm run start:dev`. A porta padrão para acessar a api é a 3009 `http://localhost:3009`.

#### Migração do Banco de dados

- Antes de executar o comando de migração do prisma, é impresindivel que seja configurado as variaveis de ambiente;
- Para executar as migrções rodar o comando `npx prisma migrate dev`;

para faciltar a atulização da API é possivel acessar a documentação localmente no endereço
http://localhost:3009/api/documentation

### Rotas da API

## Métodos

Requisições para a API devem seguir os padrões:
| Método | ROTA |
|---|---|
| `POST` | /api/session |
| `POST` | /api/refresh |
| `POST` | /api/customers/register |
| `GET` | /api/customers |
| `GET` | /api/customers/:id |
| `PATCH` | /api/customers/:id |
| `DELETE` | /api/customers/:id |
| `POST` | /api/contacts |
| `GET` | /api/contacts |
| `GET` | /api/contacts/:id |
| `PATCH` | /api/contacts/:id |
| `DELETE` | /api/contacts/:id |

## Respostas

| Código | Descrição                                 |
| ------ | ----------------------------------------- |
| `200`  | The request was made successfully.        |
| `400`  | should not be empty.                      |
| `401`  | User not authorized to make this request. |
| `404`  | The ID doesn't exist.                     |
| `409`  | This " < key, value > " already exists    |

#

#### Dados para envio no POST

| Parâmetro        | Descrição                                       |
| ---------------- | ----------------------------------------------- |
| `grant_type`     | Informar: `personal`                            |
| `personal_token` | Token JWT com informações da aplicação cliente. |



#### Reposta Token


+ Request (application/json)

      + Body

       {
            "accessToken":
             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNub29weSIsInN1YiI6IjFhN2RhYTdmLTQzOWUtNDJiZC05NjBlLTMwMTUzZDhjYTkyNiIsImlhdCI6MTcwMTY5NTc4NSwiZXhwIjoxNzAxNjk5Mzg1fQ.UO5acX5yuhzhd2DiKxMrb9xQT_Vmq7JJfeXfm4EXR4o",
            "refreshToken":
             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNub29weSIsInN1YiI6IjFhN2RhYTdmLTQzOWUtNDJiZC05NjBlLTMwMTUzZDhjYTkyNiIsImlhdCI6MTcwMTY5NTc4NSwiZXhwIjoxNzAyMzAwNTg1fQ.eS2qYFmKYDJH-2Qnu1Pk4JQmxMCg2DDuCp62gyboCJo"

  }


