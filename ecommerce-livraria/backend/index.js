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
  if (req.params.id) filter = ' WHERE bookAutor.ISBN = ' + parseInt(req.params.id);
  execSQLQuery(`SELECT  livros.description,livros.edition,livros.ISBN,livros.pages,livros.price,
  livros.pubdate,livros.publisher,livros.title,autores.nameF,autores.nameL,autores.AuthorID
  FROM bookdescriptions as livros
  INNER JOIN bookauthorsbooks AS bookAutor ON livros.ISBN = bookAutor.ISBN
  INNER JOIN bookauthors AS autores ON autores.AuthorID = bookAutor.AuthorID
  ` + filter, res);
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

// Cadastro de uma pessoa no site
router.post('/add/cliente', (req, res) => {

  const nomeP = req.body.nomeP.substring(0, 150);
  const nomeS = req.body.nomeS.substring(0, 150);
  const email = req.body.email.substring(0, 150);
  const city = req.body.city.substring(0, 50);
  const cep = req.body.cep.substring(0, 17);
  const state = req.body.state.substring(0, 3);
  const end = req.body.end.substring(0, 150);
  const number = req.body.number;
  const referencia = req.body.referencia.substring(0, 150);

  sql = `INSERT INTO bookcustomers VALUES
    (0,'${nomeP}','${nomeS}','${email}','${city}',
    '${cep}','${state}','${end}',${number}, '${referencia}')`;

  execSQLQuery(sql, res);
});

// Validação de login se o email existe no banco
router.get('/valida/:email?', (req, res) => {

  const email = req.params.email

  if (req.params.email) {
    sql = `SELECT * FROM bookcustomers AS c where c.email = '${email}';`;
  }
  execSQLQuery(sql, res);

})

// Retorna dados do cliente a partir de email existente


router.get('/confirma/endereco/:email?', (req, res) => {

  const email = req.params.email
  console.log(email);
  if (req.params.email) {
    sql = `SELECT * FROM bookcustomers WHERE email = '${email}';`;
  }
  execSQLQuery(sql, res);

})

router.put('/confirma/endereco/atualiza', (req, res) => {

  const custID = req.body[0].custID
  const nomeP = req.body[0].fname;
  const nomeS = req.body[0].lname;
  const email = req.body[0].email;
  const city = req.body[0].city;
  const cep = req.body[0].cep;
  const state = req.body[0].state;
  const end = req.body[0].street;
  const number = req.body[0].numero;
  const referencia = req.body[0].referencia;



    sql = `
    UPDATE bookcustomers
  SET fname = '${nomeP}',
  lname = '${nomeS}',
  email ='${email}' ,
  city = '${city}',
  cep = '${cep}',
  state = '${state}',
  street = '${end}',
  numero = '${number}',
  referencia = '${referencia}'
  WHERE custID = '${custID}'`;



  execSQLQuery(sql, res);

})

// Retorna o pedido pelo ID no cliente

//router.post('/ordemdetalhes', (req, res) => {
//console.log('teste2: ',req.body);

 // const cod1 = parseInt(req.body.codcliente);
 // const cod2 =parseInt( req.body.orderID);

 // console.log('---------->',cod1,cod2);

 // sql = `SELECT a.orderID, c.street, l.title, i.qty, l.price, i.price
  //FROM bookcustomers as c
 //  inner join bookorders as a on a.custID = c.custID
  //  inner join bookorderitems as i on i.orderID = a.orderID
  //   inner join bookdescriptions as l on l.ISBN = i.ISBN
   //   where c.custID = ${cod1} AND a.orderID = ${cod2} `;


 //execSQLQuery(sql, res);
//});

router.get('/ordemdetalhes/?codCliente=?&codOrder=?', (req, res) => {
//console.log('teste2: ',req.body);

const codCliente = req.params.codCliente;
const codOrder = req.params.codOrder;

 // const cod1 = parseInt(req.body.codcliente);
 // const cod2 =parseInt( req.body.orderID);

 // console.log('---------->',cod1,cod2);

  sql = `SELECT a.orderID, c.street, l.title, i.qty, l.price, i.price
  FROM bookcustomers as c
   inner join bookorders as a on a.custID = c.custID
    inner join bookorderitems as i on i.orderID = a.orderID
     inner join bookdescriptions as l on l.ISBN = i.ISBN
      where c.custID = ${codCliente} AND a.orderID = ${codOrder} `;

      console.log(sql);

 execSQLQuery(sql, res);
});

// Retorna dados para tela de historico

router.get('/historico/:id?', (req, res) => {
  const id = req.params.id


    sql = `SELECT  a.orderID, l.ISBN, l.title, i.qty, a.orderdate, ba.nameF, ba.nameL, ba.AuthorID
    FROM bookcustomers as c
    inner join bookorders as a on a.custID = c.custID
    inner join bookorderitems as i on i.orderID = a.orderID
    inner join bookdescriptions as l on l.ISBN = i.ISBN
    inner join bookauthorsbooks as b on b.ISBN = l.ISBN
    inner join bookauthors as ba on ba.AuthorID = b.AuthorID
    where c.custID = ${id} `;

  execSQLQuery(sql, res);

})


// Gravando ordem
router.post('/order', (req, res) => {

  const custID = req.body[0].custID;

  sql = `insert into bookorders values (0,${custID}, null); `;
  execSQLQuery(sql, res);
});
// Retornando ultima ordem
router.get('/retorno', (req, res) => {
  sql = `SELECT b.orderID FROM bookorders as b  ORDER BY b.orderID DESC limit 1`;
  execSQLQuery(sql, res);
});
// Salvando pedido no banco
router.post('/add/item', (req, res) => {
  //console.log(req.body);
  //const orderID = parseInt(req.params.idOrdem);
  const orderID = req.body.orderID;
  const ISBN = req.body.ISBN;
  const qtd = req.body.qtd;
  const price = req.body.price;
  sql = `insert into bookorderitems value (${orderID},'${ISBN}',${qtd},${price});  `;
  console.log(sql);
  execSQLQuery(sql, res);

});
//Retorna curtId de um cliente pelo email
router.get('/:email?', (req, res) => {
  const email = req.params.email;

  sql = `SELECT c.custID FROM bookcustomers as c where email = "${email}";`
  execSQLQuery(sql, res);

});

//*******************FIM****************************** */

//inicia o servidor
app.listen(port);




function execSQLQuery(sqlQry, res) {

  const connection = mysql.createConnection({

    //host: 'livraria.co7kg02oqfea.us-east-1.rds.amazonaws.com',
    //user: 'admin',
    //password: 'denis123',
    //database: 'ecommerce',

    host: 'localhost', user: 'root', password: '',

    database: 'sandvigbookstore',
    //database: 'livraria',

    port: 3306

  });


  connection.connect(function (err) {
    if (err) {
      console.log("Banco não conectado, alterar string de conexão !");
    } else console.log('API funcionando!');
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error)
      res.json(error);
    else {
      res.json(results);
    }

    console.log()

    connection.end();
    console.log('executou!');
  });

}

