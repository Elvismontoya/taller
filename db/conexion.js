const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taller_productos"
});

conexion.connect(err => {
  if (err) {
    console.error(" Error de conexión:", err);
  } else {
    console.log("Conexión a MySQL exitosa");
  }
});

module.exports = conexion;
