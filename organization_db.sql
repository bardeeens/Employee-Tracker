CREATE DATABASE organization_db;
USE organization_db;

CREATE TABLE department(
id INTEGER auto_increment primary key NOT NULL,
name varchar(30) NOT NULL
);

CREATE TABLE role(
id INTEGER auto_increment primary key NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL (8,2) NOT NULL,
department_id INTEGER NOT NULL
);

CREATE TABLE employee(
id INTEGER auto_increment primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER
);

 INSERT INTO department (id, name) values (1, 'Finance');
 INSERT INTO role (id, title, salary, department_id) values (1, 'manager', '100000.00', 1);
 INSERT INTO employee (id, first_name, last_name, role_id) values (1, 'Derek', 'Bardini', 1);
 
 select * from department;
 select * from role;
 select * from employee;

