CREATE DATABASE IF NOT EXISTS storefinal
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER DATABASE storefinal
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE storefinal;

CREATE TABLE IF NOT EXISTS productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  categoria   VARCHAR(50)   NOT NULL,
  marca       VARCHAR(50)   NOT NULL,
  modelo      VARCHAR(80)   NOT NULL,
  descripcion VARCHAR(255),
  garantia    INT           NOT NULL DEFAULT 12,   -- meses
  stock       INT           NOT NULL DEFAULT 0,
  fotografia  VARCHAR(255),
  metodopago  ENUM('efectivo','visa') NOT NULL,
  precio      DECIMAL(10,2) NOT NULL,
  disponible  TINYINT(1)    NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS especificaciones (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  idproducto     INT          NOT NULL,
  especificacion VARCHAR(60)  NOT NULL,
  valor          VARCHAR(100) NOT NULL,
  FOREIGN KEY (idproducto) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS consultados (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  idproducto INT      NOT NULL,
  fechahora  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idproducto) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 

/*SELECT TABLE_NAME, ENGINE, TABLE_COLLATION
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'storefinal';*/