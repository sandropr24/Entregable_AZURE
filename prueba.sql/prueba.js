import { buscarProductos, obtenerEspecificaciones, buscarPorPrecioMaximo } from './productos.js';

console.log('--- buscarProductos("dell") ---');
console.log(await buscarProductos('dell'));

console.log('--- obtenerEspecificaciones(1) ---');
console.log(await obtenerEspecificaciones(1));

console.log('--- buscarPorPrecioMaximo(200) ---');
console.log(await buscarPorPrecioMaximo(200));

console.log('--- producto sin especificaciones (id 5) ---');
console.log(await obtenerEspecificaciones(5));

console.log('--- producto inexistente (id 999) ---');
console.log(await obtenerEspecificaciones(999));

console.log('--- búsqueda sin resultados ---');
console.log(await buscarProductos('zzzz'));
process.exit();