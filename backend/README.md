# TCC
Trabalho de conclusão de curso: "radar da informação" um website onde jornalistas recém-formados podem postar suas notícias e serem reconhecidos.

## Instalação:

Para a instalação correta das dependências do projeto (os pacotes necessários), é preciso rodar os respectivos comandos no console:

  ### `npm init`

  ### `npm install bcrypt connect-flash cookie-parser cors express express-flash express-session jsonwebtoken multer mysql2 nodemon sequelize session-file-store`


## Conexão com banco de dados

No diretório "\backend\db", é onde se localiza o arquivo de conexão com o banco de dados "conn.js", Dentro da instância do objeto Sequelize a estrutura a ser seguida deve ser a mesma, mudando apenas os parametros:

### `dbname, user, password`

**Note: os parametros `host` e `dialect` só devem ser mudados caso o banco de dados for diferente**

