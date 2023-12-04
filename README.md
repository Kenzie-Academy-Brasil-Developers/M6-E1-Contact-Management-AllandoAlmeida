# M6-E1-Contact-Management
O Sistema de Gestão de Clientes e Contatos (SGCC) é uma solução eficiente e intuitiva desenvolvida para simplificar o cadastro e gerenciamento de clientes e seus respectivos contatos. Com foco na praticidade e organização, o SGCC permite que empresas e profissionais mantenham um registro detalhado de suas interações com clientes.

O projeto esta composto por duas pastas 
- M6-E1-Contact-Management-API;
- M6-E1-Contact-Management-FrontEnd;

é Imprensdindivel que antes de acessar as aplicações vovê deve instalar as dependencias, caso contrario não será possivel acessar os projetos

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

para faciltar a atulização da API é possivel acessar a documentação localmente no endereço 
http://localhost:3009/api/documentation

### Rotas da API

#### Login

#### POST /api/session
#### POST /api/refresh

#### Customers
#### POST /api/customers/register
#### GET /api/customers
#### GET /api/customers/:id
#### PATCH /api/customers/:id
#### DELETE /api/customers/:id

#### CONTACTS

#### GET /api/contacts
#### GET /api/contacts/:id
#### PATCH /api/contacts/:id
#### DELETE /api/contacts/:id


## M6-E1-Contact-Management-FrontEnd

A Aplicação constem uma plataforma que possibilita realizar o Login, para os usuarios não cadastrado, no tela de login existe a possbilidade de acessar a tela para realizar o cadastro.

Para executar a aplicação basta abrir o terminal na raiz do diretório "M6-E1-Contact-Management-API"
e rodar o comando `npm start:dev`. A porta padrão para acessar a api é a 3009.
