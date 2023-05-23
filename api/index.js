import express from "express";
import cors from "cors";
import mysql from "mysql"


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// conectando ao banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rcrtfu6e',
  database: 'native_crud'
});

// pega todas as consultas
app.get("/api/customer", (req, res) => {
  db.query("SELECT * FROM customer", (err, result) => {
    if(err){
      res.json({
         err: true,
         message: err
        })
    }else {
      res.json({
        list: result
      })
    }
  })
})

// pega um id especifico
app.get("/api/customer/:id", (req, res) => {
  db.query("SELECT * FROM customer WHERE customer_id = ?", [req.params.id],(err, result) => {
    if(err){
      res.json({
         err: true,
         message: err
        })
    }else {
      res.json({
        list: result
      })
    }
  })
})

// adiciona um novo usuario
app.post("/api/customer/", (req, res) => {
  //get parameter from body json
  var body = req.body;
  console.log(body)
  var sqlInsert = "INSERT INTO customer (customer_id, firstname, lastname, gender, tel, email, create_at) VALUES (?,?,?,?,?,?, NOW())";
  db.query(sqlInsert, [body.customer_id, body.firstname, body.lastname, body.gender, body.tel, body.email, body.create_at], (err, result) => {
    if(err){
      res.json({
         err: true,
         message: err
        })
    }else {
      res.json({
        message: "Usuário criado com sucesso",
        data: result
      })
    }
  })
})

//atualiza um usuario existente
app.put("/api/customer/", (req, res) => {
  var body = req.body;
  var sqlUpdate = "UPDATE customer SET firstname = ?, lastname = ?,gender = ?, tel = ?, email = ? WHERE customer_id = ?"
  db.query(sqlUpdate,[body.firstname, body.lastname, body.gender, body.tel, body.email, body.id],(err,result)=>{
    if(err){
      res.json({
         err: true,
         message: err
        })
    }else {
      res.json({
        message: "Usuário atualizado com sucesso"        
      })
    }
  })
})

//deletar usuario
app.delete("/api/customer/", (req, res) => {
  var body = req.body;
  if(body.id == "" || body.id == null){
    res.json({ 
      err:true,
      message: "Param id required"
    })
    return false;
  }
  db.query("DELETE FROM customer WHERE customer_id = ?", [body.id], (err ) => {
    if(err){
      res.json({
         err: true,
         message: err
        })
    }else {
      res.json({
        message: "Deletado com sucesso!"
      })
    }
  })
})


app.listen(8080, () =>{
  console.log('http://localhost:8080');
})