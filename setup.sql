DROP DATABASE IF EXISTS assesstment;
CREATE DATABASE assesstment CHARACTER SET utf8;
USE assesstment;

CREATE TABLE IF NOT EXISTS clients(
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS policies(
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    amountInsured Decimal(10, 2) NOT NULL,
    email VARCHAR(255) NOT NULL,
    inceptionDate VARCHAR(255) NOT NULL,
    installmentPayment TinyInt(1) NOT NULL,
    clients_id VARCHAR(255),
    INDEX par_ind (clients_id),
    CONSTRAINT fk_clients FOREIGN KEY (clients_id)
    REFERENCES clients(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=INNODB;