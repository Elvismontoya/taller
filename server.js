const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productosRoutes = require("./routes/productos");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Sirve archivos estáticos

app.use("/productos", productosRoutes); // Rutas CRUD

app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});