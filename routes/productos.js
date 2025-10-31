const express = require("express");
const router = express.Router();
const conexion = require("../db/conexion");

// Crear producto
router.post("/", (req, res) => {
  const { nombre, precio, categoria } = req.body;
  const sql = "INSERT INTO productos (nombre, precio, categoria) VALUES (?, ?, ?)";
  conexion.query(sql, [nombre, precio, categoria], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Producto creado", id: result.insertId });
  });
});

// Leer productos
router.get("/", (req, res) => {
  const sql = "SELECT *, (SELECT SUM(precio) FROM productos) AS total FROM productos";
  conexion.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Actualizar producto
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoria } = req.body;
  const sql = "UPDATE productos SET nombre = ?, precio = ?, categoria = ? WHERE id = ?";
  conexion.query(sql, [nombre, precio, categoria, id], err => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Producto actualizado" });
  });
});

// Eliminar producto
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM productos WHERE id = ?";
  conexion.query(sql, [id], err => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Producto eliminado" });
  });
});

module.exports = router;