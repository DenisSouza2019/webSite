const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
var cors = require('cors') //  < --------------- IMPORTANTE (rode: npm install --save cors)

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()) //  < --------------- IMPORTANTE

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//**************INICIO************************ */


// Retorna dados da tabela bookdescriptions
// Com a descrição de toda a tabela a cada consulta retorna dados
// randomicamente
router.get('/livros', (req, res) => {

  sql = `SELECT  livros.description,livros.edition,livros.ISBN,livros.pages,livros.price,
    livros.pubdate,livros.publisher,livros.title,autores.nameF,autores.nameL,autores.AuthorID
    FROM bookdescriptions as livros
    INNER JOIN bookauthorsbooks AS bookAutor ON livros.ISBN = bookAutor.ISBN
    INNER JOIN bookauthors AS autores ON autores.AuthorID = bookAutor.AuthorID
    ORDER BY rand() LIMIT 0,03;`

  execSQLQuery(sql, res);
})

// Retorna todas as categorias
router.get('/categorias', (req, res) => {

  execSQLQuery('SELECT * FROM bookcategories order by bookcategories.CategoryName ASC', res);
})

// Retorna dados de apenas um livro
router.get('/livro/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE ISBN=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM bookdescriptions' + filter, res);
})

// Retorna Livros pelo ID da categoria listar com ordem alfabetica
router.get('/categoria/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) {
    sql = `SELECT  livros.description,livros.edition,livros.ISBN,livros.pages,livros.price,
        livros.pubdate,livros.publisher,livros.title,autores.nameF,autores.nameL,autores.AuthorID
        FROM bookdescriptions AS livros
        INNER JOIN bookcategoriesbooks AS a ON livros.ISBN = a.ISBN
        INNER JOIN bookcategories AS b ON b.CategoryID = a.CategoryID
        INNER JOIN bookauthorsbooks AS bookAutor ON livros.ISBN = bookAutor.ISBN
        INNER JOIN bookauthors AS autores ON autores.AuthorID = bookAutor.AuthorID
        WHERE b.CategoryID = ${ parseInt(req.params.id)}
        ORDER BY livros.title ASC`;
  }
  execSQLQuery(sql, res);
})

// Lista todos os livros referente aquele Autor
router.get('/autor/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) {
    sql = `SELECT * FROM bookdescriptions as c
        inner join bookauthorsbooks as a  on c.ISBN = a.ISBN
        inner join bookauthors as b  on a.AuthorID = b.AuthorID
        where b.AuthorID = ${ parseInt(req.params.id)}`;
  }
  execSQLQuery(sql, res);
})

// Lista todos os livros que tenha alguma string parecida com o titulo
// ou descrição
router.get('/pesquisa/:nome?', (req, res) => {
  //const nome = req.body.nome.substring(0, 150);
  const nome = req.params.nome

  if (req.params.nome) {
    sql = `SELECT livros.description,livros.edition,livros.ISBN,livros.pages,livros.price,
        livros.pubdate,livros.publisher,livros.title,autores.nameF,autores.nameL,autores.AuthorID
        FROM bookdescriptions AS livros
        INNER JOIN bookauthorsbooks AS bookAutor ON livros.ISBN = bookAutor.ISBN
        INNER JOIN bookauthors AS autores ON autores.AuthorID = bookAutor.AuthorID
        where livros.title LIKE "%${nome}%" OR
        livros.description LIKE "%${nome}%"
        ORDER BY livros.title ASC `;
  }
  execSQLQuery(sql, res);

})

//*******************FIM****************************** */

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({

    host: 'livraria.co7kg02oqfea.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'denis123',
    database: 'ecommerce',

    //host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'sandvigbookstore',
    //database: 'livraria',

    port: 3306

  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error)
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('executou!');
  });
}

