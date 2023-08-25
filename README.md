# TCC
  Trabalho de conclusão de curso: "radar da informação" um website onde jornalistas recém-formados podem postar suas notícias e serem reconhecidos.

## Back-end Instalação:

  Para a instalação correta das dependências do projeto, no backend(os pacotes necessários), é preciso rodar os respectivos comandos no console na pasta /backend:

  ### `npm init`

  ### `npm install bcrypt connect-flash cookie-parser cors express express-flash express-session jsonwebtoken multer mysql2 nodemon sequelize session-file-store`


## Conexão com banco de dados

  No diretório "\backend\db", é onde se localiza o arquivo de conexão com o banco de dados "conn.js", Dentro da instância do objeto Sequelize a estrutura a ser seguida deve ser a mesma, mudando apenas os parametros:

  ### `dbname, user, password`

  **Note: os parametros `host` e `dialect` só devem ser mudados caso o banco de dados for diferente**


## Rotas (importante para o front-end)

A rotas estão divididas em User e News (para usuário e noticia):

  ## Rotas do usuário:

  `/register` -> rota do tipo **POST** e **publica** para fazer o registro do usuário, requer: name, email, phone, password, confirmpassword;

  `/login` -> rota do tipo **POST** e **publica** para fazer o login do usuário, requer: email, password;

  `/checkuser` -> rota do tipo **GET** e **publica** para buscar o usuário logado no momento;

  `/:id` -> rota do tipo **GET** e **publica** para buscar um usuário pelo id;

  `/edit/:id` rota do tipo **PATCH** e **privada** para editar um usuário, requer: name, email, phone, password, confirmpassword;

  ## Rotas das notícias:

  `/create` -> rota do tipo **POST** e **privada** para a criação de uma nova notícia, requer: title, caption, article;

  `/mynews` -> rota do tipo **GET** e **privada** para a busca das notícias do usuário logado;

  `/:id` -> rota que pode assumir o tipo **DELETE** e **privada** usada para deletar uma notícia pelo id;

  `/:id` -> rota que pode assumir o tipo **PATCH** e **privada** usada para editar uma notícia, requer: title, caption, article;

  `/` -> rota do tipo **GET** e **publica** para listagem de todas as notícias;

  `/:id` rota que pode assumir o tipo **GET** e **publica** para listar uma notícia pelo id;



## Front-end instalação:

  Para a instalação correta das dependências do projeto, no frontend(os pacotes necessários), é preciso rodar os respectivos comandos no console na pasta /frontend:

  ### `npm init`

  ### `npm install react-router-dom react-scripts axios bootstrap react-toastify`