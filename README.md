# M6-E1-Contact-Management
O Sistema de Gestão de Clientes e Contatos (SGCC) é uma solução eficiente e intuitiva desenvolvida para simplificar o cadastro e gerenciamento de clientes e seus respectivos contatos. Com foco na praticidade e organização, o SGCC permite que empresas e profissionais mantenham um registro detalhado de suas interações com clientes.

O projeto esta composto por duas pastas 
- M6-E1-Contact-Management-API;
- M6-E1-Contact-Management-FrontEnd;

# É imprescindível que, antes de acessar as aplicações, você instale as dependências; caso contrário, não será possível acessar os projetos.

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
e rodar o comando `npm run dev`. A porta padrão para acessar a api é a 3000. `http://localhost:3009`


# É imprescindível que, antes de acessar as aplicações, você instale as dependências; caso contrário, não será possível acessar os projetos.

## Installation

```bash
$ npm install
```



### Funcionalidades

#### Sessão de Login
O usuário precisa realizar login para ter acesso às outras funcionalidades. O login é feito por meio
de username e senha. Caso o usuario esteja logado ele pode verificar se está autenticado em todas as rotas

#### Sessão de Cadastro
Caso o usuário não tenha uma sessão, ele poderá criar uma nova conta. Para isso será necessario
preencher os campos obrigatorios (username, email, password). Após preenchendo todos os dados corretamente, Apos o cadastro o usuário devera retornar a sessão de login para acessar a aplicação

#### Atualização de Dados e Funalizar conta
A partir da tela inicial o usuário tem a opção de editar os dados cadastrados ou deletar sua conta

#### Listagem de contatos
No menu lateral estará disponível a listagem de todos os contato e ao lado direito um botão que ao ser clicado exibira uma tela com as informações como nome, email, telefone endereço e a opçao de atualizar e deletar o cliente

#### Criação de Contatos
O usuário também tem a opção de adicionar novos contatos. Os campos obrigatórios são nome, email e
telefone entre outros dados. 




