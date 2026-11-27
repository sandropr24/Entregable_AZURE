// productos.js - Consultas SQL (Félix)
import pool from './db.js';

const CAMPOS_RESUMEN =
  'id, categoria, marca, modelo, descripcion, precio, stock, garantia, metodopago, disponible';

// Punto 1: buscar por modelo, marca, categoría o descripción
export async function buscarProductos(termino) {
  const like = `%${termino}%`;
  const [filas] = await pool.query(
    `SELECT ${CAMPOS_RESUMEN}
     FROM productos
     WHERE modelo LIKE ? OR marca LIKE ? OR categoria LIKE ? OR descripcion LIKE ?
     ORDER BY disponible DESC, precio ASC
     LIMIT 5`,
    [like, like, like, like]
  );
  return filas;
}

// Punto 1: buscar por precio máximo
export async function buscarPorPrecioMaximo(maximo) {
  const [filas] = await pool.query(
    `SELECT ${CAMPOS_RESUMEN}
     FROM productos
     WHERE precio <= ? AND disponible = 1
     ORDER BY precio DESC
     LIMIT 5`,
    [Number(maximo)]
  );
  return filas;
}

export async function obtenerProducto(idProducto) {
  const [filas] = await pool.query('SELECT * FROM productos WHERE id = ?', [idProducto]);
  return filas[0] || null;
}

// Punto 3: registrar la consulta
export async function registrarConsulta(idProducto) {
  const [resultado] = await pool.query(
    'INSERT INTO consultados (idproducto) VALUES (?)',
    [idProducto]
  );
  return resultado.insertId;
}

// Puntos 2 y 3: datos técnicos y registro automático en "consultados"
export async function obtenerEspecificaciones(idProducto) {
  const producto = await obtenerProducto(idProducto);
  if (!producto) return null;

  await registrarConsulta(idProducto);

  const [filas] = await pool.query(
    'SELECT especificacion, valor FROM especificaciones WHERE idproducto = ? ORDER BY id',
    [idProducto]
  );
  return { producto, especificaciones: filas };
}