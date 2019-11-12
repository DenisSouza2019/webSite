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
    let filter = '';
    if (req.params.id) filter = ' WHERE codigo=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM bookdescriptions ORDER BY rand() LIMIT 0,03' + filter, res);
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
        sql = `SELECT *
        FROM bookdescriptions AS l
        INNER JOIN bookcategoriesbooks AS a ON l.ISBN = a.ISBN
        INNER JOIN bookcategories AS b ON b.CategoryID = a.CategoryID
        WHERE b.CategoryID = ${ parseInt(req.params.id)}
        ORDER BY l.title ASC`;
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
router.get('/pesquisa/', (req, res) => {
    const nome = req.body.nome.substring(0, 150);
    if (nome) {
        sql = `SELECT * FROM bookdescriptions
        where bookdescriptions.title LIKE "%${nome}%" OR
        bookdescriptions.description LIKE "%${nome}%"
        ORDER BY bookdescriptions.title ASC `;
    }
    execSQLQuery(sql, res);
})

//*******************FIM****************************** */




//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({

        host: 'localhost', // livraria.co7kg02oqfea.us-east-1.rds.amazonaws.com
        port: 3306,
        user: 'root', // admin
        password: '', //denis123
        database: 'sandvigbookstore' // ecommerce

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

