import mysql from "mysql"


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "server",
    database: "banco",

  })

  export default db;
