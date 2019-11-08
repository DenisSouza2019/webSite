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

// CONSULTAR ALUNO OU DISCIPLINA */

// Listar uma aluno pelo CODIGO
router.get('/aluno/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE codigo=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM aluno' + filter, res);
})

// Listar uma Discipplina pelo CODIGO
router.get('/disciplina/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE codigo=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM discip' + filter, res);
})

// DELETAR ALUNO OU DISCIPLINA */
// Deletar um Aluno pelo Codigo
router.delete('/delete/aluno/:id', (req, res) => {
    execSQLQuery('DELETE FROM aluno WHERE codigo=' + parseInt(req.params.id), res);
})
// Deletar uma Disciplina pelo Codigo
router.delete('/delete/disciplina/:id', (req, res) => {
    execSQLQuery('DELETE FROM discip WHERE codigo=' + parseInt(req.params.id), res);
})

// CADASTRAR ALUNO OU DISCIPLINA */
// SQL = INSERT into aluno VALUES(1001,"DenisSouzadaRosa","2000-07-19")
router.post('/add/alunos', (req, res) => {
    const codigo = parseInt(req.body.codigo.substring(0, 11));
    const nome = req.body.nome.substring(0, 150);
    const dt_nasc = req.body.dt_nasc.substring(0, 11);
    execSQLQuery(`INSERT INTO aluno VALUES('${codigo}','${nome}','${dt_nasc}')`, res);
});
router.post('/add/disciplinas', (req, res) => {
    const codigo = parseInt(req.body.codigo.substring(0, 11));
    const nome = req.body.nome.substring(0, 150);
    const creditos = parseInt(req.body.creditos.substring(0, 11));
    execSQLQuery(`INSERT INTO discip VALUES('${codigo}','${nome}','${creditos}')`, res);
});

// Alterar ALUNO OU DISCIPLINA */
router.post('/alterar/aluno', (req, res) => {
    const codigo = parseInt(req.body.codigo.substring(0, 11));
    const nome = req.body.nome.substring(0, 150);
    const dt_nasc = req.body.dt_nasc.substring(0, 11);
    execSQLQuery(`UPDATE aluno SET nome='${nome}',dt_nasc='${dt_nasc}'
                    WHERE codigo=${codigo}`, res);
});
//UPDATE discip SET nome = "REDE 2", creditos = 64 WHERE codigo = 4
router.post('/alterar/disciplina', (req, res) => {
    const codigo = parseInt(req.body.codigo.substring(0, 11));
    const nome = req.body.nome.substring(0, 150);
    const creditos = parseInt(req.body.creditos.substring(0, 11));

    execSQLQuery(`UPDATE discip SET nome='${nome}',creditos=${creditos} WHERE codigo=${codigo}`, res);
});

// Retornar alunos matriculados em um disciplina
router.get('/matricula/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) {
        sql = `SELECT a.codigo,a.nome 
    FROM aluno AS a
    INNER JOIN matricula AS m 
    ON a.codigo = m.codAluno
    WHERE m.codDiscip = ${parseInt(req.params.id)}`;
    }
    execSQLQuery(sql, res);
})
router.post('/add/matriculas',(req,res)=>{
    const cod_aluno = parseInt(req.body.cod_aluno.substring(0,11));
    const cod_disc = parseInt(req.body.cod_disc.substring(0,11));
    if(cod_aluno != null && cod_disc != null){
        sql = `INSERT INTO matricula
         VALUES(${cod_aluno},
         ${cod_disc})`
    }
    execSQLQuery(sql,res);
})
// Deletar uma Disciplina pelo Codigo
router.post('/remove/matriculas/', (req, res) => {
    const cod_disc = parseInt(req.body.cod_disc.substring(0,11));
    const cod_aluno = parseInt(req.body.cod_aluno.substring(0,11));
   

    if(cod_disc != null && cod_aluno != null){
    sql=`DELETE FROM matricula 
    WHERE   matricula.codDiscip= ${cod_disc}
    AND     matricula.codAluno = ${cod_aluno}`
}

    execSQLQuery(sql, res);
})




//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({

        host: 'localhost',
        port: 3306,
        user: 'aluno',
        password: '123',
        database: 'escola'

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

