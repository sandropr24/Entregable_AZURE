USE storefinal;

DELETE FROM consultados;
DELETE FROM especificaciones;
DELETE FROM productos;
ALTER TABLE productos AUTO_INCREMENT = 1;

INSERT INTO productos
(id, categoria, marca, modelo, descripcion, garantia, stock, fotografia, metodopago, precio, disponible) VALUES
(1, 'Informática', 'DELL',     'All in One', 'Computadora personal',        24,  5, 'img/dell-aio.jpg',   'visa',     4500.00, 1),
(2, 'Informática', 'LOGITECH', 'M90',        'Mouse básico USB',            12, 10, 'img/m90.jpg',        'visa',       65.00, 1),
(3, 'Informática', 'HP',       'Pavilion 15','Laptop 15.6" para estudio',   12,  8, 'img/pavilion.jpg',   'visa',     2800.00, 1),
(4, 'Telefonía',   'SAMSUNG',  'Galaxy A55', 'Smartphone gama media',       12, 15, 'img/a55.jpg',        'visa',     1500.00, 1),
(5, 'Audio',       'SONY',     'WH-CH520',   'Audífonos inalámbricos',      12, 20, 'img/ch520.jpg',      'efectivo',  180.00, 1),
(6, 'Televisores', 'LG',       'UR8050 50"', 'Smart TV 4K 50 pulgadas',     24,  4, 'img/lg50.jpg',       'visa',     1900.00, 1),
(7, 'Informática', 'KINGSTON', 'A400 480GB', 'Disco sólido SATA',           36, 30, 'img/a400.jpg',       'efectivo',  150.00, 1),
(8, 'Audio',       'JBL',      'Flip 6',     'Parlante bluetooth portátil', 12,  0, 'img/flip6.jpg',      'visa',      450.00, 0);

INSERT INTO especificaciones (idproducto, especificacion, valor) VALUES
(1, 'RAM', '32 Gb'), (1, 'CPU', 'Intel Core i7 14G'), (1, 'SSD', '1000 Gb'),
(1, 'Gráfica', '3060 TI'), (1, 'Pantalla', '24"'),
(2, 'Conexión', 'USB'), (2, 'Sensor', 'Óptico 1000 dpi'),
(3, 'RAM', '16 Gb'), (3, 'CPU', 'Intel Core i5 13G'), (3, 'SSD', '512 Gb'),
(4, 'RAM', '8 Gb'), (4, 'Almacenamiento', '256 Gb'), (4, 'Pantalla', '6.6" AMOLED'),
(6, 'Resolución', '4K UHD'), (6, 'Pantalla', '50"');

SELECT COUNT(*) FROM productos;                      -- 8
SELECT * FROM especificaciones WHERE idproducto = 1; -- 5 filas