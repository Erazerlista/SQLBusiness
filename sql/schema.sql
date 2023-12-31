DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NULL,
    salary DECIMAL(10, 2) NULL,
    department_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NULL,
    last_name VARCHAR(45) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);