## M6-E1-Contact-Management-FrontEnd

A Aplicação constem uma plataforma que possibilita realizar o Login, para os usuarios não cadastrado, no tela de login existe a possbilidade de acessar a tela para realizar o cadastro.

Para executar a aplicação basta abrir o terminal na raiz do diretório "M6-E1-Contact-Management-FrontEnd"
e rodar o comando `npm run dev`. A porta padrão para acessar a api é a 3000. `http://localhost:3000`





##### É imprescindível que, antes de acessar as aplicações, você instale as dependências; caso contrário, não será possível acessar os projetos.



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




