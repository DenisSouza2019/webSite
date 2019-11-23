const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors') ;
const port = 3000; //porta padrão
var bd = require("./conectDatabase");

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()) //  < --------------- IMPORTANTE

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


app.listen(port);
console.log("Rotandando porta: ",port);

// Salvando pedido no banco
router.post('/add/carinho', (req, res) => {

    const custID = parseInt(req.body.custID.substring(0, 150));
    const ISBN = req.body.ISBN.substring(0, 150);
    const qtd = parseInt(req.body.qtd.substring(0, 150));
    const price = parseFloat(req.body.price.substring(0, 50));
    const orderdate = parseInt(req.body.orderdate.substring(0,50));
   
    
    sql = `insert into bookorders value (0,${custID},${orderdate}); `;
    
    bd.connect();
    
    bd.query(sql, function (error, results, fields) {
        if (error) throw error;
        
         
          sql2=`insert into bookorderitems value (${results.insertId},'0596007272',20,999); `;
          bd.query(sql2, function (error, results, fields) {
            if (error) throw error;        
          });
            //---------

        bd.end();
      });
   
    
    
  
   
    
  });




