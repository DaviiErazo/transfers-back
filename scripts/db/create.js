const mysql = require('mysql2');  

require('dotenv').config();


const { 
  RIPLEY_DB_USER, 
  RIPLEY_DB_PASS, 
  RIPLEY_DB_HOST,
  RIPLEY_DB_NAME,
} = process.env;

const dbName = RIPLEY_DB_NAME

const connection = mysql.createConnection({  
  host: RIPLEY_DB_HOST,  
  user: RIPLEY_DB_USER,  
  password: RIPLEY_DB_PASS  
});  

connection.connect((err) => {
  if (err) throw err;
  connection.query(`CREATE DATABASE ${dbName}`, (err, result) => {
    
    if (err && err.code === "ER_DB_CREATE_EXISTS") {
      console.log('Db already created');
      process.exit(0);
    } 
    
    if (err) {
      throw err;
    }

    console.log('Created db');
    process.exit(0);
  })
})